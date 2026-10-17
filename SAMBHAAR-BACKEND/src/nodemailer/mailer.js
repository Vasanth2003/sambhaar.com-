  const nodemailer = require("nodemailer");

  // Configure the transporter for email service
  const transporter = nodemailer.createTransport({
    service: "gmail", // or another email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Send OTP email function
  const sendOTPEmail = async (userEmail, otp, username) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Welcome to Sambhaar.com ❤️ - Verify Your Email for Easy Grocery Shopping!",
        html: `
          <p>Hi ${username},</p>
          <p>Welcome to <a href="https://www.sambhaar.com">sambhaar.com!</a></p>
          <p>To complete your registration, please enter the OTP below:</p>
          <h3>Your OTP: ${otp}</h3>
          <p>This code is valid for the next 2 minutes.</p>
          <p>Happy shopping @ <a href="https://www.sambhaar.com">www.sambhaar.com 🛒</a></p>
          <br>
          <p>Best,</p>
          <p>Team</p>
          <p><a href="https://www.sambhaar.com 🛒">www.sambhaar.com</a></p>
          <hr>
          <p>Need help? Contact us at <strong>+91 818181 2912</strong> or <strong>sambhaaronline@gmail.com</strong></p>
        `,
      };

      // Send email and return the result
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      // Log the error and rethrow to allow caller to handle
      console.error('Error sending OTP email:', error);
      return null;
    }
  };

  module.exports = { sendOTPEmail };