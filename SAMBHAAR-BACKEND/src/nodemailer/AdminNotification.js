const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

const sendAdminNotification = async (user) => {
  try {
    const currentDateTime = new Date().toLocaleString(); // Get the current date and time for registration
    const formattedCreatedAt = new Date(user.createdAt).toLocaleString(); // Format the createdAt date

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Admin email address
      subject: "New User Registration Notification⚠️",
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
            b {
              color: #000;
            }
          </style>
        </head>
        <body>
          <p>Dear Sambhaar.com Team,</p>
          <p>I am writing to inform you that a new user has successfully registered on Sambhaar.com. Below are the details of the new registration:</p>
          <ul>
            <li><b>Username:</b> ${user.username}</li>
            <li><b>Email Address:</b> ${user.email}</li>
            <li><b>Mobile:</b> ${user.phoneNumber || "N/A"}</li>
            <li><b>Registration Date and Time:</b> ${formattedCreatedAt}</li>
          </ul>
          <p>Please log in to the admin panel for more information or assistance regarding this new registration.</p>
          <p>Best regards,<br>Administrator</p>
        </body>
      </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending admin notification email:", error);
    return null;
  }
};

module.exports = { sendAdminNotification };
