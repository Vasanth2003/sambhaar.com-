const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

const sendThanksEmail = async (email, username) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Vanakkam 🙏! Thank you for registering with Sambhaar.com!",
      html: `
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Poppins', sans-serif;
              color: #333;
              line-height: 1.6;
            }
            h1, h2, h3, h4, h5, h6 {
              font-weight: 600;
            }
            p {
              font-size: 16px;
              margin-bottom: 15px;
            }
            a {
              color: #0066cc;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            b {
              color: #000;
            }
          </style>
        </head>
        <body>
          <p>Dear ${username},</p>
          <p>Thank you for registering with <a href="https://www.sambhaar.com">Sambhaar.com</a>! We're thrilled to have you as part of our community.</p>
          <p>At <a href="https://www.sambhaar.com">Sambhaar.com</a>, we strive to provide you with the best Grocery Essentials, Dairy Products, Dhal & Pulses, Sweets & Savories, Beverages, and Ice creams, etc… to meet your needs. To get started, we recommend exploring the following:</p>
          <ul>
            <li><b>Personalize Your Profile:</b> Update your profile to receive tailored recommendations.</li>
            <li><b>Explore Our Features:</b> Discover the various features designed to enhance your experience.</li>
            <li><b>Stay Informed:</b> Keep an eye on your inbox for updates, exclusive offers, and the latest news.</li>
          </ul>
          <p>If you have any questions or need assistance, our support team is here to help. Feel free to reach out at <a href="tel:+918181812921">+91 818181 2921</a> / <a href="mailto:support@sambhaar.com">support@sambhaar.com</a></p>
          <p>Once again, welcome aboard! We look forward to serving you.</p>
          <p>Best regards,<br>Customer Support Team<br><a href="https://www.sambhaar.com">Sambhaar.com</a></p>
        </body>
      </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return null;
  }
};

module.exports = { sendThanksEmail };
