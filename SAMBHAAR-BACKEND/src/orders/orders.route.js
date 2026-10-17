    const express = require("express");
    const router = express.Router();
    const crypto = require("crypto");
    const axios = require("axios");
    const Order = require("./orders.model"); // Ensure you have the updated Order model
    const {sendOrderNotification} = require("./../nodemailer/SendOrderNotification");

    const merchant_id = process.env.MERCHANT_ID;
    const salt_key = process.env.SALT_KEY;
    const salt_index = 1;

  //   router.get("/hello",(req,res)=>{
  //   res.status(200).json({message:"Hosted!!"})
  // })
    // Create PhonePe checkout session
    router.post("/create-checkout-session", async (req, res) => {
      try {
        let {
          user,
          name,
          MUID,
          GrandTotal,
          products,
          selectedItems,
          transaction,
          phoneNumber,
          address,
        } = req.body;

        const data = {
          merchantId: merchant_id,
          merchantTransactionId: transaction,
          userId: user._id,
          product: products,
          phoneNumber: phoneNumber,
          address: address,
          selectedItems: selectedItems,
          amount: GrandTotal * 100,
          redirectUrl: `https://api.sambhaar.com/api/orders/status?id=${transaction}`,
          redirectMode: "POST",
          paymentInstrument: {
            type: "PAY_PAGE",
          },
        };
        // console.log(data);
        
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString("base64");

        const string = payloadMain + "/pg/v1/pay" + salt_key;
        const sha256 = crypto.createHash("sha256").update(string).digest("hex");
        const checksum = sha256 + "###" + 1;

        const options = {
          method: "POST",
          url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "X-VERIFY": checksum,
          },
          data: { request: payloadMain },
        };

        const phonePeResponse = await axios(options);
        console.log(`Phonepe Response from web${phonePeResponse}`);
        
        // Check if payment initiation was successful
        if (phonePeResponse.data.success) {
          const newOrder = new Order({
            userId: user._id,
            name:name,
            orderId: transaction,
            products: products.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
              name: item.name,
              category: item.category,
              subcategory: item.subcategory,
              brand: item.brand,
              price: item.price,
              weight: item.weight,
              image: item.image,
            })),
            amount: GrandTotal,
            // email: user.email,
            address: address,
            phoneNumber: phoneNumber,
            orderStatus: "Ordered",
            paymentMethod: "Phonepe",
            paymentStatus: "Pending",
          });
          // console.log(`Phonepe data Response from web ${phonePeResponse.data.data.instrumentResponse} `);

          
          await newOrder.save();
          await sendOrderNotification(newOrder);
          res.json({
            message: "Payment initiated successfully",
            data: {
              instrumentResponse:
                phonePeResponse.data.data.instrumentResponse || {},
            },
          });
        } else {
          res.status(400).json({ error: "Payment initiation failed" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    });

  router.post("/mobile/create-checkout-session-mobile", async (req, res) => {
    try {
      const {
        user,
        products,
        GrandTotal,
        phoneNumber,
        address,
      } = req.body;
      console.log("Heo");
      
      // ✅ Generate safe transaction id
      // const transaction = `MOB_${Date.now()}`;
const transaction = `MOBORD_${Date.now()}_${Math.floor(Math.random()*1000)}`;
      // ✅ Amount in paise (INTEGER ONLY)
      const amountInPaise = Math.round(Number(GrandTotal) * 100);

      // 🔥 PHONEPE PAYLOAD (DO NOT ADD EXTRA FIELDS)
      const phonePePayload = {
        merchantId: merchant_id,
        merchantTransactionId: transaction,
        merchantUserId: user._id,
        amount: amountInPaise,
        redirectUrl: `https://api.sambhaar.com/api/orders/status?id=${transaction}`,
        redirectMode: "POST",
        callbackUrl: `https://api.sambhaar.com/api/orders/phonepe/callback`,
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };

      

      const payloadBase64 = Buffer
        .from(JSON.stringify(phonePePayload))
        .toString("base64");

      const checksum =
        crypto
          .createHash("sha256")
          .update(payloadBase64 + "/pg/v1/pay" + salt_key)
          .digest("hex") +
        "###1";

      const phonePeResponse = await axios.post(
        "https://api.phonepe.com/apis/hermes/pg/v1/pay",
        { request: payloadBase64 },
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            accept: "application/json",
          },
        }
      );
          console.log(`Phonepe Response from mobile${phonePeResponse.data.data.instrumentResponse}` );


      //   const phonePeResponse = await axios.post(
      //   "https://api.phonepe.com/apis/pg/v1/pay",
      //   { request: payloadBase64 },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "X-VERIFY": checksum,
      //       accept: "application/json",
      //     },
      //   }
      // );

      

      if (!phonePeResponse.data.success) {
        return res.status(400).json({ success: false, message: "PhonePe failed" });
      }

      const normalizedProducts = products.map((item) => ({
    productId: item._id,                 // REQUIRED
    name: item.name,
    category: item.category || "General",
    subcategory: item.subcategory || "General", // REQUIRED
    brand: item.brand || "Genericc",      // REQUIRED
    quantity: item.quantity || 1,
    price: item.price,
    image: item.image,
  }));
    
  const newOrder = new Order({
    userId: user._id,
    orderId: transaction,
    products: normalizedProducts,
    amount: GrandTotal,
    // email: user.email,
    address,
    phoneNumber,
    orderStatus: "Ordered",   // MUST EXIST IN ENUM
    paymentMethod: "Phonepe", // EXACT ENUM VALUE
    paymentStatus: "Pending",
  });


      await newOrder.save();

      // ✅ SEND REDIRECT URL TO FLUTTER
          let redirectUrl =
            phonePeResponse.data.data.instrumentResponse.redirectInfo.url;
      
        //     redirectUrl +=
        // "&appId=com.phonepe.app&platform=ANDROID&isMobileApp=true&mobileApp=true";
      
            console.log(`Phonepe data Response from mobile ${phonePeResponse.data.data.instrumentResponse} `);

      return res.json({
        success: true,
        paymentUrl: redirectUrl,
        transactionId: transaction,
      });

    } catch (error) {
      console.error("📛 Mobile checkout error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });


    // Route for Cash on Delivery order
    router.post("/create-cod-order", async (req, res) => {
      try {
        const { user, MUID, GrandTotal, products, selectedItems, transaction } =
          req.body;

        const newOrder = new Order({
          userId: user._id,
          orderId: transaction,
          products: products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            name: item.name,
            category: item.category,
            subcategory: item.subcategory,
            brand: item.brand,
            price: item.price,
            weight: item.weight,
            image: item.image,
          })),
          amount: GrandTotal,
          // email: user.email,
          address: address,
          phoneNumber: phoneNumber,
          orderStatus: "Ordered",
          paymentMethod: "Cash",
          paymentStatus: "Pending", // Will change once the order is delivered
        });

        await newOrder.save();

        // Send a response with the success status and a custom URL for frontend redirection
        return res.json({
          message: "COD Order placed successfully",
          redirectUrl: `https://www.sambhaar.com/order-success?id=${transaction}`,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    });

    // Route to handle PhonePe payment status callback
    router.post("/status", async (req, res) => {
      try {
        const merchantTransactionId = req.query.id;
        const merchantId = merchant_id;

        const keyIndex = 1;
        const string =
          `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
        const sha256 = crypto.createHash("sha256").update(string).digest("hex");
        const checksum = sha256 + "###" + keyIndex;

        const options = {
          method: "GET",
          url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": merchantId,
          },
        };

        const response = await axios(options);
        const isPaymentSuccessful = response.data.success;

        if (isPaymentSuccessful) {
          await Order.findOneAndUpdate(
            { orderId: merchantTransactionId },
            { orderStatus: "Ordered", paymentStatus: "Success" }
          );
          return res.redirect( `https://www.sambhaar.com/order-success/?id=${merchantTransactionId}`
          );
        } else {
          await Order.findOneAndUpdate(
            { orderId: merchantTransactionId },
            { orderStatus: "Ordered", paymentStatus: "Pending" }
          );
          return res.redirect("https://sambhaar.com/failure");
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    });

    // Order success endpoint to fetch order by orderId
    router.get("/order-success/:orderId", async (req, res) => {
      try {
        const { orderId } = req.params;
        const order = await Order.findOne({ orderId });
        if (order) {
          res.json({ order });
        } else {
          res.status(404).json({ error: "Order not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    });

    //get order by email address
    router.get("/:email", async (req, res) => {
      const email = req.params.email;
      if (!email) {
        return res.status(400).send({ message: "Email is required" });
      }

      try {
        const orders = await Order.find({ email: email });
        if (orders.length === 0 || !orders) {
          return res
            .status(400)
            .send({ orders: 0, message: "No order found for this email" });
        }
        res.status(200).send({ orders });
      } catch (error) {
        console.log("Error fetching orders by email", error);
        res.status(500).send({ message: "Failed to fetching orders by email" });
      }
    });


        router.get("/getOrders/:phoneNumber", async (req, res) => {
      const phoneNumber = req.params.phoneNumber;
      if (!phoneNumber) {
        return res.status(400).send({ message: "phoneNumber is required" });
      }

      try {
        const orders = await Order.find({ phoneNumber: phoneNumber });
        if (orders.length === 0 || !orders) {
          return res
            .status(400)
            .send({ orders: 0, message: "No order found for this Phone Number" });
        }
        res.status(200).send({ orders });
      } catch (error) {
        console.log("Error fetching orders by email", error);
        res.status(500).send({ message: "Failed to fetching orders by Phone Number" });
      }
    });

    // get order by id
    router.get("/order/:id", async (req, res) => {
      try {
        const order = await Order.findById(req.params.id);
        if (!order) {
          return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).send(order);
      } catch (error) {
        console.error("Error fetching orders by user id", error);
        res.status(500).send({ message: "Failed to fetch orders by user id" });
      }
    });

    // get all orders
    router.get("/", async (req, res) => {
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        if (orders.length === 0) {
          return res.status(404).send({ message: "No orders found", orders: [] });
        }

        res.status(200).send(orders);
      } catch (error) {
        console.error("Error fetching all orders", error);
        res.status(500).send({ message: "Failed to fetch all orders" });
      }
    });

    // update order status
    router.patch("/update-order-status/:id", async (req, res) => {
      const { id } = req.params;
      const { orderStatus } = req.body;
      if (!orderStatus) {
        return res.status(400).send({ message: "orderStatus is required" });
      }

      try {
        const updatedOrder = await Order.findByIdAndUpdate(
          id,
          {
            orderStatus,
            updatedAt: new Date(),
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!updatedOrder) {
          return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).json({
          message: "Order status updated successfully",
          order: updatedOrder,
        });
      } catch (error) {
        console.error("Error updating order status", error);
        res.status(500).send({ message: "Failed to update order status" });
      }
    });

    // delete order
    router.delete("/delete-order/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
          return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).json({
          message: "Order deleted successfully",
          order: deletedOrder,
        });
      } catch (error) {
        console.error("Error deleting order", error);
        res.status(500).send({ message: "Failed to delete order" });
      }
    });


  router.post("/create-checkout-session-mobile", async (req, res) => {
    try {
      const { user, GrandTotal, products } = req.body;

      // Generate a valid transaction ID
      // const transaction = `T${Date.now()}`; // Alphanumeric, unique, short enough
      const transaction = `ORD_${Date.now()}_${Math.floor(Math.random()*1000)}`;
      // Build PhonePe payload (same as web, only mobile deep link)
      const data = {
        merchantId: merchant_id,
        merchantTransactionId: transaction,
        userId: user._id,
        product: products,
        amount: GrandTotal * 100,
        redirectUrl: `myapp://payment-success?id=${transaction}`, // Mobile deep link
        redirectMode: "GET",
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };

      console.log("🧾 RAW PRODUCTS FROM REQUEST:");
  console.log(JSON.stringify(products, null, 2));


      const payload = JSON.stringify(data);
      const payloadBase64 = Buffer.from(payload).toString("base64");

      const string = payloadBase64 + "/pg/v1/pay" + salt_key;
      const sha256 = crypto.createHash("sha256").update(string).digest("hex");
      const checksum = sha256 + "###1";
      console.log("Hi");

      const options = {
        method: "POST",
        url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "X-VERIFY": checksum,
        },
        data: { request: payloadBase64 },
      };

      const phonePeResponse = await axios(options);
      console.log("📦 PhonePe Response:", phonePeResponse.data);


      if (phonePeResponse.data.success) {
        // Save order in DB (pending)
        const newOrder = new Order({
          userId: user._id,
          orderId: transaction,
          products: products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            name: item.name,
            price: item.price,
            image: item.image,
          })),
          amount: GrandTotal*100,
          // email: user.email,
          orderStatus: "Ordered",
          paymentMethod: "Phonepe",
          paymentStatus: "Pending",
        });
        await newOrder.save();

        // Respond with redirect URL
        return res.json({
          success: true,
          data: {
            redirectUrl: phonePeResponse.data.data.instrumentResponse.url,
            transactionId: transaction,
            callbackFail: `myapp://payment-failed?id=${transaction}`,
          },
        });
      } else {
        return res.status(400).json({ error: "Payment initiation failed" });
      }
    } catch (err) {
      console.error("Mobile checkout error:", err.response?.data || err.message);
      return res.status(500).json({ error: err.message });
    }
  });


  router.get("/verify-payment/:transactionId", async (req, res) => {
    try {
      const { transactionId } = req.params;

      const string = `/pg/v1/status/${merchant_id}/${transactionId}` + salt_key;
      const sha256 = crypto.createHash("sha256").update(string).digest("hex");
      const checksum = sha256 + "###" + 1;

      const response = await axios.get(
        `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchant_id}/${transactionId}`,
        {
          headers: {
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": merchant_id,
          },
        }
      );

      if (response.data.success &&
          response.data.data.state === "COMPLETED") {

        // ✅ Mark order as PAID in DB
        res.json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  });






  router.post("/mobile/payment/status", async (req, res) => {
    const transactionId = req.query.tx;

    try {
      const statusPayload = `/pg/v1/status/${merchant_id}/${transactionId}${salt_key}`;
      // const checksum = crypto.createHash("sha256").update(statusPayload).digest("hex") + "###1";
      const checksum =
    crypto
      .createHash("sha256")
      .update(payloadMain + "/pg/v1/pay" + salt_key)
      .digest("hex") + "###" + salt_index;

      const statusResponse = await axios.get(
        `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchant_id}/${transactionId}`,
        {
          headers: {
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": merchant_id,
          },
        }
      );
    

      const paymentState = statusResponse.data.data.state;

      if (paymentState === "COMPLETED") {
        await Order.findOneAndUpdate(
          { orderId: transactionId },
          { paymentStatus: "SUCCESS", orderStatus: "CONFIRMED" }
        );
      } else {
        await Order.findOneAndUpdate(
          { orderId: transactionId },
          { paymentStatus: "FAILED" }
        );
      }

      res.json({
        success: true,
        paymentStatus: paymentState,
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // router.post("/mobile/payment/initiate", async (req, res) => {
  //   try {
  //     const { userId, email, products, amount, phoneNumber, address } = req.body;
  //     const transactionId = "MOB_" + Date.now();

  //     const data = {
  //       merchantId: merchant_id,
  //       merchantTransactionId: transactionId,
  //       merchantUserId: userId,
  //       amount: Math.round(amount * 100),
  //       // redirectUrl is what the USER sees in their browser/app after payment
  //       redirectUrl: `https://api.sambhaar.com/api/orders/mobile/payment/status?tx=${transactionId}`,
  //       // callbackUrl is the SECURE server-to-server webhook
  //       callbackUrl: `https://api.sambhaar.com/api/orders/payment/webhook`,
  //       redirectMode: "POST",
  //       mobileNumber: phoneNumber,
  //       paymentInstrument: { type: "PAY_PAGE" },
  //     };

  //     const payloadMain = Buffer.from(JSON.stringify(data)).toString("base64");
  //     const checksum = crypto.createHash("sha256").update(payloadMain + "/pg/v1/pay" + salt_key).digest("hex") + "###" + salt_index;

  //     const phonePeResponse = await axios.post(
  //       "https://api.phonepe.com/apis/hermes/pg/v1/pay",
  //       { request: payloadMain },
  //       {
  //         headers: {
  //           accept: "application/json",
  //           "Content-Type": "application/json",
  //           "X-VERIFY": checksum,
  //         },
  //       }
  //     );

  //     if (phonePeResponse.data.success) {
  //       // Create order with 'Pending' status
  //       const newOrder = new Order({
  //         userId,
  //         orderId: transactionId,
  //         products: products.map(item => ({ ...item, productId: item._id })),
  //         amount,
  //         email,
  //         address,
  //         phoneNumber,
  //         paymentStatus: "PENDING",
  //         platform: "MOBILE",
  //       });
  //       await newOrder.save();

  //       let url = phonePeResponse.data.data.instrumentResponse.redirectInfo.url;
  //       // Append mobile-specific flags for better app-to-app switching
  //       const mobileUrl = `${url}&appId=com.phonepe.app&platform=ANDROID&isMobileApp=true`;

  //       return res.json({ success: true, paymentUrl: mobileUrl, transactionId });
  //     }
      
  //     res.status(400).json({ success: false, message: "Initiation failed" });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // });


  // router.post("/mobile/payment/initiate", async (req, res) => {
  //   try {
  //     const { userId, email, products, selectedItems, amount, phoneNumber, address } = req.body;
  //     const transaction = "MOB_" + Date.now();

  //     const data = {
  //       merchantId: merchant_id,
  //       merchantTransactionId: transaction,
  //       merchantUserId: userId,
  //       // Note: PhonePe documentation suggests keeping the payload light. 
  //       // Ensure 'products' doesn't exceed size limits if sent here.
  //       amount: Math.round(amount * 100), 
  //       redirectUrl: `https://api.sambhaar.com/api/orders/mobile/payment/status?tx=${transaction}`, 
  //       redirectMode: "POST",
  //       mobileNumber: phoneNumber,
  //       paymentInstrument: { type: "PAY_PAGE" },
  //     };

  //     const payloadMain = Buffer.from(JSON.stringify(data)).toString("base64");
  //     const string = payloadMain + "/pg/v1/pay" + salt_key;
  //     const checksum = crypto.createHash("sha256").update(string).digest("hex") + "###1";

  //     const phonePeResponse = await axios.post(
  //       "https://api.phonepe.com/apis/hermes/pg/v1/pay",
  //       { request: payloadMain },
  //       {
  //         headers: {
  //           accept: "application/json",
  //           "content-type": "application/json",
  //           "X-VERIFY": checksum,
  //         },
  //       }
  //     );

  //     if (!phonePeResponse.data.success) {
  //       return res.status(400).json({ error: "Payment initiation failed" });
  //     }

  //     // Process Address (Convert to String if Mongoose expects String)
  //     const orderAddress = typeof address === 'object' ? JSON.stringify(address) : address;

  //     const newOrder = new Order({
  //       userId,
  //       orderId: transaction,
  //       products: products.map((item) => ({
  //         productId: item._id,
  //         quantity: item.quantity,
  //         name: item.name,
  //         category: item.category,
  //         price: item.price,
  //         image: item.image,
  //         subcategory: item.subcategory || "Dairy & Fresh Foods",
  //         brand: item.brand || "Aavin",
  //       })),
  //       amount,
  //       email,
  //       address: orderAddress,
  //       phoneNumber,
  //       orderStatus: "Ordered",
  //       paymentMethod: "Phonepe",
  //       paymentStatus: "Pending",
  //       platform: "MOBILE",
  //     });

  //     await newOrder.save();

  //     let paymentUrl = phonePeResponse.data.data.instrumentResponse.redirectInfo.url;
  //     // Standard PhonePe App Invocation parameters
  //     paymentUrl += `&appId=com.phonepe.app&platform=ANDROID&isMobileApp=true`;

  //     return res.json({
  //       success: true,
  //       paymentUrl,
  //       transactionId: transaction,
  //     });

  //   } catch (error) {
  //     console.error("📛 Mobile payment error:", error.response?.data || error.message);
  //     res.status(500).json({ error: error.message });
  //   }
  // });

  router.post("/mobile/payment/initiate", async (req, res) => {
    try {
      const {
        userId,
        // email,
        products,
        selectedItems,
        amount,
        phoneNumber,
        address,
      } = req.body;

      const transaction = "MOB_" + Date.now();

      // 🔹 PhonePe payload (same as web)
      const data = {
        merchantId: merchant_id,
        merchantTransactionId: transaction,
        merchantUserId: userId,
        product: products,
        phoneNumber,
        address,
        selectedItems,
        amount: amount * 100, // ✅ VERY IMPORTANT
        redirectUrl: `myapp://payment-success?id=${transaction}`, // 📱 mobile deep link
        redirectMode: "POST",
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };

      const payload = JSON.stringify(data);
      const payloadMain = Buffer.from(payload).toString("base64");

      const string = payloadMain + "/pg/v1/pay" + salt_key;
      const checksum =
        crypto.createHash("sha256").update(string).digest("hex") + "###1";

      const phonePeResponse = await axios.post(
        "https://api.phonepe.com/apis/hermes/pg/v1/pay",
        { request: payloadMain },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "X-VERIFY": checksum,
          },
        }
      );

      if (!phonePeResponse.data.success) {
        return res.status(400).json({ error: "Payment initiation failed" });
      }

      // 🔹 Save order (same as web)
      const newOrder = new Order({
        userId,
        orderId: transaction,
        products: products.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          name: item.name,
          category: item.category,
          price: item.price,
          image: item.image,
          subcategory: item.subcategory || "Dairy & Fresh Foods - Milk, Ghee & Dairy Products", // ✅ fallback
          brand: item.brand || "Aavin",
        })),
        amount,
        // email,
        address,
        phoneNumber,
        orderStatus: "Ordered",
        paymentMethod: "Phonepe",
        paymentStatus: "Pending",
        platform: "MOBILE",
      });

      await newOrder.save();
      let paymentUrl = phonePeResponse.data.data.instrumentResponse.redirectInfo.url
      paymentUrl += `&appId=com.phonepe.app&platform=ANDROID&isMobileApp=true&mobileApp=true`;

      return res.json({
        success: true,
        paymentUrl,
        transactionId: transaction,
      });

    } catch (error) {
      console.error("📛 Mobile payment error:", error);
      res.status(500).json({ error: error.message });
    }
  });


  router.post("/mobile/payment/status", async (req, res) => {
    const transactionId = req.query.tx;

    try {
      const statusPayload = `/pg/v1/status/${merchant_id}/${transactionId}${salt_key}`;
      const checksum = crypto.createHash("sha256").update(statusPayload).digest("hex") + "###1";

      const statusResponse = await axios.get(
        `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchant_id}/${transactionId}`,
        {
          headers: {
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": merchant_id,
          },
        }
      );
    

      const paymentState = statusResponse.data.data.state;

      if (paymentState === "COMPLETED") {
        await Order.findOneAndUpdate(
          { orderId: transactionId },
          { paymentStatus: "SUCCESS", orderStatus: "CONFIRMED" }
        );
      } else {
        await Order.findOneAndUpdate(
          { orderId: transactionId },
          { paymentStatus: "FAILED" }
        );
      }

      res.json({
        success: true,
        paymentStatus: paymentState,
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });



  // router.post("/mobile/payment/initiate", async (req, res) => {
  //   try {
  //     const {
  //       userId,
  //       email,
  //       products,
  //       selectedItems,
  //       amount,
  //       phoneNumber,
  //       address,
  //     } = req.body;

  //     const transaction = "MOB_" + Date.now();

  //     // 🔹 PhonePe payload (same as web)
  //     const data = {
  //       merchantId: merchant_id,
  //       merchantTransactionId: transaction,
  //       merchantUserId: userId,
  //       // product: products,
  //       mobileNumber: phoneNumber,
  //       // address,
  //       // selectedItems,
  //       amount: amount * 100, 
  //       redirectUrl: `https://api.sambhaar.com/api/orders/mobile/payment/status?id=${transaction}`, 
  //       redirectMode: "POST",
  //       paymentInstrument: {
  //         type: "PAY_PAGE",
  //       },
  //     };
      
  //     const payload = JSON.stringify(data);
  //     const payloadMain = Buffer.from(payload).toString("base64");

  //     const string = payloadMain + "/pg/v1/pay" + salt_key;
  //     const checksum =
  //       crypto.createHash("sha256").update(string).digest("hex") + "###1";

  //     const phonePeResponse = await axios.post(
  //       "https://api.phonepe.com/apis/hermes/pg/v1/pay",
  //       { request: payloadMain },
  //       {
  //         headers: {
  //           accept: "application/json",
  //           "content-type": "application/json",
  //           "X-VERIFY": checksum,
  //         },
  //       }
  //     );

  //     if (!phonePeResponse.data.success) {
  //       return res.status(400).json({ error: "Payment initiation failed" });
  //     }

  //     // 🔹 Save order (same as web)
  //     const newOrder = new Order({
  //       userId,
  //       orderId: transaction,
  //       products: products.map((item) => ({
  //         productId: item._id,
  //         quantity: item.quantity,
  //         name: item.name,
  //         category: item.category,
  //         price: item.price,
  //         image: item.image,
  //         subcategory: item.subcategory || "Dairy & Fresh Foods - Milk, Ghee & Dairy Products", // ✅ fallback
  //         brand: item.brand || "Aavin",
  //       })),
  //       amount,
  //       email,
  //       address,
  //       phoneNumber,
  //       orderStatus: "Ordered",
  //       paymentMethod: "Phonepe",
  //       paymentStatus: "Pending",
  //       platform: "MOBILE",
  //     });

  //     await newOrder.save();
  //     let paymentUrl = phonePeResponse.data.data.instrumentResponse.redirectInfo.url
  //     // paymentUrl += `&appId=com.phonepe.app&platform=ANDROID&isMobileApp=true&mobileApp=true`;

  //     return res.json({
  //       success: true,
  //       paymentUrl,
  //       transactionId: transaction,
  //     });

  //   } catch (error) {
  //     console.error("📛 Mobile payment error:", error);
  //     res.status(500).json({ error: error.message });
  //   }
  // });


  router.post("/mobile/payment/status", async (req, res) => {
    const transactionId = req.query.tx;

    try {
      const statusPayload = `/pg/v1/status/${merchant_id}/${transactionId}${salt_key}`;
      const checksum = crypto.createHash("sha256").update(statusPayload).digest("hex") + "###1";

      const statusResponse = await axios.get(
        `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchant_id}/${transactionId}`,
        {
          headers: {
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": merchant_id,
          },
        }
      );
    

      const paymentState = statusResponse.data.data.state;

      if (paymentState === "COMPLETED") {
        await Order.findOneAndUpdate(
          { orderId: transactionId },
          { paymentStatus: "SUCCESS", orderStatus: "CONFIRMED" }
        );
      } else {
        await Order.findOneAndUpdate(
          { orderId: transactionId },
          { paymentStatus: "FAILED" }
        );
      }

      res.json({
        success: true,
        paymentStatus: paymentState,
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  router.post("/payment-success", (req, res) => {
    const transactionId =
      req.query.id || req.body.merchantTransactionId || "UNKNOWN";

    console.log("✅ Payment success callback received");
    console.log("Transaction ID:", transactionId);
    console.log("Body:", req.body);

    // You can update order status here if needed

    return res.status(200).send(`
      <html>
        <head><title>Payment Success</title></head>
        <body>
          <h2>Payment Successful ✅</h2>
          <p>Transaction ID: ${transactionId}</p>
          <p>You may close this window.</p>
        </body>
      </html>
    `);
  });




  router.post("/mobile/payment/status", async (req, res) => {
    const transactionId = req.query.tx;

    try {
      const statusPayload = `/pg/v1/status/${merchant_id}/${transactionId}${salt_key}`;
      const checksum = crypto.createHash("sha256").update(statusPayload).digest("hex") + "###1";

      const statusResponse = await axios.get(
        `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchant_id}/${transactionId}`,
        {
          headers: {
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": merchant_id,
          },
        }
      );
    

      const paymentState = statusResponse.data.data.state;

      if (paymentState === "COMPLETED") {
        await Order.findOneAndUpdate(
          { orderId: transactionId },
          { paymentStatus: "SUCCESS", orderStatus: "CONFIRMED" }
        );
      } else {
        await Order.findOneAndUpdate(
          { orderId: transactionId },
          { paymentStatus: "FAILED" }
        );
      }

      res.json({
        success: true,
        paymentStatus: paymentState,
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });


  router.post("/payment/webhook", async (req, res) => {
    const { response } = req.body; // Base64 string from PhonePe
    const xVerify = req.headers["x-verify"];

    // 1. Verify Checksum (Security Check)
    const string = response + salt_key;
    const expectedChecksum = crypto.createHash("sha256").update(string).digest("hex") + "###" + salt_index;

    if (xVerify !== expectedChecksum) {
      return res.status(400).send("Invalid Signature");
    }

    // 2. Decode Payload
    const decodedData = JSON.parse(Buffer.from(response, "base64").toString("utf-8"));

    if (decodedData.success && decodedData.code === "PAYMENT_SUCCESS") {
      // 3. Update Order in DB
      await Order.findOneAndUpdate(
        { orderId: decodedData.data.merchantTransactionId },
        { paymentStatus: "Paid", transactionId: decodedData.data.transactionId }
      );
    }

    res.status(200).send("OK");
  });
    module.exports = router;