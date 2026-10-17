const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const axios = require("axios");
const Subscription = require("./subscriptions.model");

const merchant_id = process.env.MERCHANT_ID;
const salt_key = process.env.SALT_KEY;

// router.post("/create-checkout-session", async (req, res) => {
//   try {
//     const {
//       userDetails,
//       duration,
//       startDate,
//       subscriptionId,
//       milks,
//       amount,
//       phone,
//       address,
//     } = req.body;

//     const data = {
//       merchantId: merchant_id,
//       merchantTransactionId: subscriptionId,
//       merchantUserId: userDetails.email,
//       amount: amount * 100, // In paise
//       redirectUrl: `https://api.yoursite.com/api/subscriptions/status?id=${subscriptionId}`,
//       redirectMode: "POST",
//       paymentInstrument: {
//         type: "PAY_PAGE",
//       },
//     };

//     const payload = JSON.stringify(data);
//     const base64Payload = Buffer.from(payload).toString("base64");

//     const string = base64Payload + "/pg/v1/pay" + salt_key;
//     const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//     const checksum = sha256 + "###1";

//     const options = {
//       method: "POST",
//       url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//         "X-VERIFY": checksum,
//       },
//       data: { request: base64Payload },
//     };

//     const response = await axios(options);

//     if (response.data.success) {
//       const newSubscription = new Subscription({
//         name: userDetails.name,
//         email: userDetails.email,
//         phone,
//         address,
//         duration,
//         startDate,
//         subscriptionId,
//         milks,
//         amount,
//         subscriptionStatus: "Active",
//         paymentMethod: "Phonepe",
//         paymentStatus: "Pending",
//       });

//       await newSubscription.save();

//       res.status(200).json({
//         message: "Subscription initiated",
//         data: {
//           instrumentResponse:
//             response.data.data.instrumentResponse || {},
//         },
//       });
//     } else {
//       res.status(400).json({ error: "Payment initiation failed" });
//     }
//   } catch (error) {
//     console.log("Error initiating subscription payment:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/create-checkout-session", async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       street,
//       city,
//       state,
//       postalCode,
//       country,
//       duration,
//       startDate,
//       subscriptionId,
//       milks,
//       amount,
//       subscriptionStatus,
//       paymentMethod,
//       paymentStatus,
//     } = req.body;

//     const subscription = new Subscription({
//       name,
//       email,
//       phone,
//       address: {
//         street,
//         city,
//         state,
//         postalCode,
//         country,
//       },
//       duration,
//       startDate,
//       subscriptionId,
//       milks,
//       amount,
//       subscriptionStatus,
//       paymentMethod,
//       paymentStatus,
//     });
// console.log("Received subscription data:", req.body);


//     await subscription.save();
// console.log(req.body.address.street);

//     res.status(201).json({ success: true, message: "Subscription created" });
//   } catch (error) {
//     console.error("Create subscription error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });



router.post("/create-checkout-session", async (req, res) => {
  try {
    const {
      userDetails,
      duration,
      startDate,
      subscriptionId,
      milks,
      amount,
      phone,
      address,
    } = req.body;

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: subscriptionId,
      merchantUserId: userDetails.email,
      amount: amount * 100,
      redirectUrl: `https://api.sambhaar.com/api/subscriptions/status?id=${subscriptionId}`,
      redirectMode: "POST",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = JSON.stringify(data);
    const base64Payload = Buffer.from(payload).toString("base64");
    const string = base64Payload + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###1";

    const options = {
      method: "POST",
      url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-VERIFY": checksum,
      },
      data: { request: base64Payload },
    };

    const response = await axios(options);

    if (response.data.success) {
      const newSubscription = new Subscription({
        name: userDetails.name,
        email: userDetails.email,
        phone,
        address,
        duration,
        startDate,
        subscriptionId,
        milks,
        amount,
        subscriptionStatus: "Active",
        paymentMethod: "Phonepe",
        paymentStatus: "Pending",
      });

      await newSubscription.save();

      res.status(200).json({
        success: true,
        message: "Subscription initiated",
        data: {
          instrumentResponse: response.data.data.instrumentResponse,
        },
      });
    } else {
      res.status(400).json({ error: "Payment initiation failed" });
    }
  } catch (error) {
    console.log("Error initiating subscription payment:", error.message);
    res.status(500).json({ error: error.message });
  }
});


router.post("/status", async (req, res) => {
  try {
    const subscriptionId = req.query.id;

    const string = `/pg/v1/status/${merchant_id}/${subscriptionId}` + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###1";

    const response = await axios({
      method: "GET",
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchant_id}/${subscriptionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchant_id,
      },
    });

    if (response.data.success) {
      await Subscription.findOneAndUpdate(
        { subscriptionId },
        { paymentStatus: "Success" }
      );

      return res.redirect(`https://www.yoursite.com/subscription-success?id=${subscriptionId}`);
    } else {
      await Subscription.findOneAndUpdate(
        { subscriptionId },
        { paymentStatus: "Failed" }
      );

      return res.redirect("https://www.yoursite.com/payment-failure");
    }
  } catch (error) {
    console.error("Error in subscription status callback", error.message);
    res.status(500).json({ error: error.message });
  }
});



router.post("/create-cod-subscription", async (req, res) => {
  try {
    const {
      userDetails,
      duration,
      startDate,
      subscriptionId,
      milks,
      amount,
      phone,
      address,
    } = req.body;

    const newSubscription = new Subscription({
      name: userDetails.name,
      email: userDetails.email,
      phone,
      address,
      duration,
      startDate,
      subscriptionId,
      milks,
      amount,
      subscriptionStatus: "Active",
      paymentMethod: "Cash",
      paymentStatus: "Pending",
    });

    await newSubscription.save();
    res.status(200).json({
      message: "Cash subscription placed successfully",
      redirectUrl: `https://www.yoursite.com/subscription-success?id=${subscriptionId}`,
    });
  } catch (error) {
    console.log("COD Subscription Error:", error);
    res.status(500).json({ error: error.message });
  }
});



router.post("/", async (req, res) => {
  try {
    const newSub = new Subscription(req.body);
    const savedSub = await newSub.save();
    res.status(201).json({ message: "Subscription created", data: savedSub });
  } catch (err) {
    console.error("Error creating subscription:", err.message);
    res.status(500).json({ error: "Failed to create subscription" });
  }
});

router.get("/",async (req,res)=>{
    try{
        const subscriptions = await Subscription.find().sort({createdAt:1});
        res.status(200).json({ subscriptions });
    }catch(err){
        res.status(500).json({ error: "Failed to fetch subscriptions"+  err.message });
    }
})

router.get("/:id",async (req,res)=>{
   try{
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ error: "Subscription not found" });
    console.log(subscription);
    
    res.status(200).json({
        message: "Subscription successful",
  subscription: subscription,
})}catch(error){
        res.status(500).json({ error: "Failed to fetch subscription"+error.message });

   }
})

router.patch("/:id", async (req,res)=>{
   try{
     const id =await  Subscription.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true }
    );
    res.status(200).json({ message: "Subscription updated", subscription: updated });
   }catch(error){
        res.status(500).json({ error: "Failed to update subscription" });
   }


})


router.delete("/:id", async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Subscription deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subscription" });
  }
});

module.exports = router;
