// // import axios from "axios";

//  async function sendSMS(phone, message) {
//   console.log(`📨 SMS to ${phone}: ${message}`);

//   // OPTIONAL: send to webhook.site or mockbin
//   /*
//   await axios.post("https://webhook.site/YOUR_ID", {
//     phone,
//     message,
//   });
//   */

//   return true;
// }


// // const axios =require("axios") ;

// //  async function sendSMS(phone, message) {
// //   const url = "https://www.fast2sms.com/dev/bulkV2";

// //   await axios.post(
// //     url,
// //     {
// //       route: "q",
// //       numbers: phone.replace("+91", ""),
// //       message: message,
// //     },
// //     {
// //       headers: {
// //         authorization: process.env.FAST2SMS_API_KEY,
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );

  

// //   return true;
// // }

// module.exports = {sendSMS};


const axios = require("axios");

const sendSMS = async (number, message) => {
  try {
    if (!number) return;

    // const response = await axios.get(
    //   "http://panel.magictext.in/http-tokenkeyapi.php",
    //   {
    //     params: {
    //       "authentic-key": process.env.AUTHENTIC_KEY,
    //       senderid: process.env.SENDER_ID,
    //       route: 1,
    //       number,
    //       message,
    //       templateid: process.env.TEMPLATE_ID,
    //     },
    //   }
    // );

    return response.data;
  } catch (error) {
    console.log("SMS failed:", error.message);
  }
};

module.exports = { sendSMS };