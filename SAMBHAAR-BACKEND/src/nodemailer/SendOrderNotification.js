// const nodemailer = require("nodemailer");

// // Set up the email transporter
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // Your email address
//     pass: process.env.EMAIL_PASS, // Your email password or app password
//   },
// });

// // Function to send email notifications
// const sendOrderNotification = async (order) => {
//   try {
//     // Send email to admin
//     const adminMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.ADMIN_EMAIL, // Admin email address
//       subject: `New Order Received - Order ID: ${order.orderId}`,
//       html: `
//         <html>
//           <body>
//             <p>Dear Admin,</p>
//             <p>A new order has been placed on the website. Below are the order details:</p>
//             <ul>
//               <li><b>Order ID:</b> ${order.orderId}</li>
//               <li><b>User:</b> ${order.email}</li>
//               <li><b>Phone Number:</b> ${order.phoneNumber}</li>
//               <li><b>Address:</b> ${order.address}</li>
//               <li><b>Total Amount:</b> ₹${order.amount}</li>
//               <li><b>Payment Method:</b> ${order.paymentMethod}</li>
//             </ul>
//             <h3>Order Details:</h3>
//               <ul>
//                 ${order.products
//                   .map(
//                     (item) => `
//                   <li>
//                     <b>Product Name:</b> ${item.name}<br>
//                     <b>Brand:</b> ${item.brand}<br>
//                     <b>Quantity:</b> ${item.quantity}<br>
//                     <b>Price:</b> ₹${item.price}<br>
//                   </li>
//                 `
//                   )
//                   .join("")}
//               </ul>
//             <p>Please log in to the admin panel for more information.</p>
//           </body>
//         </html>
//       `,
//     };

//     // Send email to the user
//     const userMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: order.email, // User email address
//       subject: `Order Confirmation - Order ID: ${order.orderId}`,
//       html: `
//           <html>
//             <body>
//               <p>Dear ${order.email},</p>
//               <p>Thank you for your order ❤️. Your order details are as follows:</p>
//               <ul>
//                 <li><b>Order ID:</b> ${order.orderId}</li>
//                 <li><b>Total Amount:</b> ₹${order.amount}</li>
//                 <li><b>Shipping Address:</b> ${order.address}</li>
//                 <li><b>Phone Number:</b> ${order.phoneNumber}</li>
//               </ul>
//               <h3>Order Details:</h3>
//               <ul>
//                 ${order.products
//                   .map(
//                     (item) => `
//                   <li>
//                     <b>Product Name:</b> ${item.name}<br>
//                     <b>Brand:</b> ${item.brand}<br>
//                     <b>Quantity:</b> ${item.quantity}<br>
//                     <b>Price:</b> ₹${item.price}<br>
//                   </li>
//                 `
//                   )
//                   .join("")}
//               </ul>
//               <p>We will notify you once your order is shipped. If you have any questions, feel free to contact us.</p>
//             </body>
//           </html>
//         `,
//     };
//     // Sending both emails
//   try {
//   await transporter.sendMail(adminMailOptions);
//   await transporter.sendMail(userMailOptions);
// } catch (error) {
//   console.log("Email failed but order continues:", error.message);
// }
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return null;
//   }
// };

// module.exports = { sendOrderNotification };


const axios = require("axios");

const sendOrderNotification = async (order) => {
  try {
    // Construct message using template variables
    if(order.paymentStatus ===" Success") {
      
      const message = `Dear Customer! Order placed successfully. ID: ${order.orderId}, Amount: ${order.amount}. Processing now. Quality groceries delivered fast! - Maverico`;

    
    // Send SMS to customer
    const userResponse = await axios.get(
      "http://panel.magictext.in/http-tokenkeyapi.php",
      {
        params: {
          "authentic-key": process.env.AUTHENTIC_KEY,
          senderid: process.env.SENDER_ID,
          route: 1,
          number: order.phoneNumber, // Customer number
          message: message,
          templateid: "1707177634216806230",
        },
      }
    );

   

    return {
      userResponse: userResponse.data,
      adminResponse: adminResponse.data,
    }
  }

    else return 

  } catch (error) {
    console.error("Error sending SMS:", error.message);
    return null;
  }
};

module.exports = { sendOrderNotification };