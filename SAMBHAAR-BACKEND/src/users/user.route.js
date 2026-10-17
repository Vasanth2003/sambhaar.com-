const express = require("express");
const User = require("./user.model");
const generateToken = require("../middleware/generateToken");

const { otpExpiry} = require("../utils/otp.js")
const {otpStore} = require("../utils/otpStore.js");
const {sendSMS} = require("../services/sms.service.js")

const verifyToken = require("../middleware/verifyToken");
const { sendOTPEmail } = require("../nodemailer/mailer");
const { sendThanksEmail } = require("../nodemailer/Thanksemail");
const { sendAdminNotification } = require("../nodemailer/AdminNotification");
const router = express.Router();
const crypto = require("crypto");
const { default: axios } = require("axios");
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

//Register endpoint

// router.post("/sendsms-otp", async (req, res) => {
//   try {
//     const { number } = req.body;
//     // console.log(number);
    
//     const user = await User.findOne({ phoneNumber: number });

// const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000);


//     if (!number) {
//       return res.status(400).json({
//         success: false,
//         message: "Mobile number is required",
//       });
//     }

//     const otp = generateOTP();
//     const expiry = 5; // minutes

//     if (user) {
//   user.otp = otp;
//   user.otpExpires = otpExpiryTime;
//   await user.save();
// } else {
//   await User.create({
//     phoneNumber: number,
//     otp,
//     otpExpires: otpExpiryTime,
//     isPhoneVerified: false,
//   });
// }
    // const message = `Your OTP is ${otp} for Sambhaar.com. It is valid for ${expiry} minutes. Daily Essentials at Your Doorstep. Do not share this OTP. - MAVERICO`;

    // const response = await axios.get(
    //   "http://panel.magictext.in/http-tokenkeyapi.php",
    //   {
    //      params: {
    //     "authentic-key":  process.env.AUTHENTIC_KEY,
    //     senderid: process.env.SENDER_ID,
    //     route: 1,
    //     number: number,
    //     message: message,
    //     templateid: process.env.TEMPLATE_ID,
    //   },
    //   }
    // );


//     console.log("SMS API Response:", response.data);

//     res.json({
//       success: true,
//       otp: otp, 
//       response:response.data,
//       message: "OTP sent successfully",
//     });
//   } catch (error) {
//     console.error("SMS Error:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "Failed to send OTP",
//     });
//   }
// });



// router.post("/verifysms-otp", async (req, res) => {
//   try {
//     const { number, otp, role = "user" } = req.body;

//     let user = await User.findOne({ phoneNumber: number });

//     // ✅ 1. If user does not exist → create one
//     if (!user) {
//       user = new User({
//         phoneNumber: number,
//         role, // 👈 assign role here
//         isPhoneVerified: false,
//         otp: null,
//         otpExpires: null,
//       });

//       await user.save();
//     }

//     // ❌ 2. OTP validation
//     if (!user.otp) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP not generated",
//       });
//     }

//     if (user.otp.toString() !== otp.toString()) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     console.log("Saved OTP:", user.otp);
//     console.log("Entered OTP:", otp);

//     // ⏳ 3. Expiry check
//     if (user.otpExpires && user.otpExpires < new Date()) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired",
//       });
//     }

//     // ✅ 4. Mark verified
//     user.isPhoneVerified = true;
//     user.otp = null;
//     user.otpExpires = null;

//     await user.save();

//     // 🔐 5. Generate token
//     const token = generateToken(user._id);

//     return res.json({
//       success: true,
//       message: "Login successful",
//       user,
//       token,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// });

router.patch("/updateFirstTime/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isFirstTime: false }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User updated successfully!", user });
  } catch (error) {
    console.log("Error updating user", error);
    res.status(500).send({ message: "Error updating user" });
  }
}); 

router.post("/sendsms-otp", async (req, res) => {
  try {
    const { number, role = "user" } = req.body;

    if (!number) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    const otp = generateOTP();
    const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000);

    const user = await User.findOneAndUpdate(
      { phoneNumber: number },
      {
        $set: {
          phoneNumber: number,
          otp,
          otpExpires: otpExpiryTime,
        },
        $setOnInsert: {
          role, // 👈 only set when new user is created
          isPhoneVerified: false,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    const expiry = 5;
    const message = `Your OTP is ${otp} for Sambhaar.com. It is valid for ${expiry} minutes. Daily Essentials at Your Doorstep. Do not share this OTP. - MAVERICO`
      // const message = `Your OTP is ${otp} for Sambhaar.com. It is valid for 5 minutes. Daily Essentials at Your Doorstep. Do not share this OTP. - MAVERICO`;

    const response = await axios.get(
      "http://panel.magictext.in/http-tokenkeyapi.php",
      {
         params: {
        "authentic-key":  process.env.AUTHENTIC_KEY,
        senderid: process.env.SENDER_ID,
        route: 1,
        number: number,
        message: message,
        templateid: process.env.TEMPLATE_ID,
      },
      }
    );

    return res.json({
      success: true,
      message: "OTP sent successfully",
      response: response.data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});
router.post("/verifysms-otp", async (req, res) => {
  try {
    const { number, otp } = req.body;

    const user = await User.findOne({ phoneNumber: number });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please request OTP first.",
      });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP not generated",
      });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (user.otp.toString() !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ verify
    user.isPhoneVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    const token = generateToken(user._id);

    return res.json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/sendmobile-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number required" });
  }

  const otp = generateOTP();

  otpStore.set(phone, {
    otp,
    expiresAt: otpExpiry(5),
  });

  await sendSMS(phone, `Your OTP is ${otp}`);

  res.json({
    message: "OTP sent successfully",
    debugOtp: otp, // ⚠️ REMOVE IN PROD
  });
});



/**
 * VERIFY OTP
 */
router.post("/verifymobile-otp", (req, res) => {
  const { phone, otp } = req.body;
  
  const record = otpStore.get(phone);

  if (!record) {
    return res.status(400).json({ message: "OTP not found" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(phone);
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  otpStore.delete(phone);

  // 🔑 Create JWT or session here
  res.json({
    message: "OTP verified successfully",
    token: "FAKE_JWT_FOR_NOW",
  });
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;
    
    // Check if already registered and verified
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).send({ message: "Email already in use!" });
      } else {
        // If user exists but not verified, update the OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 2 * 60 * 1000);
        existingUser.otp = otp;
        existingUser.otpExpires = otpExpires;
        existingUser.username = username;
        existingUser.password = password;
        existingUser.phoneNumber = phoneNumber;
        await existingUser.save();
        await sendOTPEmail(email, otp, username);

        return res.status(200).send({
          message: "OTP resent. Please verify to complete registration.",
        });
      }
    }

    // If new user
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 2 * 60 * 1000);

    const user = new User({
      username,
      email,
      password,
      phoneNumber,
      otp,
      otpExpires,
      isVerified: false,
    });

    await user.save();
    await sendOTPEmail(email, otp, username);

    res.status(201).send({
      message: "User created. Please check your email for the OTP.",
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).send({ message: "Error registering user: " + error });
  }
});



// routes/auth.js

// router.get('/me', protect, async (req, res) => {
//   try {
//     res.status(200).json(req.user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


//Login user endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Password not match" });
    }
    if (!user.isVerified) {
      return res.status(403).send({ message: "Email was not Verified, Please verify to login" });
    }
    const token = await generateToken(user._id);

    //console.log("token:", token)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).send({
      message: "Logged in successfully!",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        address: {
          street: user.address?.street,
          city: user.address?.city,
          state: user.address?.state,
          postalCode: user.address?.postalCode,
          country: user.address?.country,
        },
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error logged in user", error);
    res.status(500).send({ message: "Error Logged in user!" });
  }
});

//logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully!" });
});

//delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    console.log("Error deleting user", error);
    res.status(500).send({ message: "Error deleting user" });
  }
});
//dummy deleting user using email for testing purpose
router.delete("/userss/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({email});
    if(user){
      User.deleteOne({email})
      res.status(200).send({ message: "User deleted successfully!" });

    }
    else  {
      
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    
    console.log("Error deleting user", error);
    res.status(500).send({ message: "Error deleting user" });
  }
});

//get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(
      {},
      "id email role username profileImage phoneNumber"
    ).sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.log("Error fetching user", error);
    res.status(500).send({ message: "Error fetching user" });
  }
});

//update your role to admin
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User role updated successfully!" });
  } catch (error) {
    console.log("Error updating user", error);
    res.status(500).send({ message: "Error updating user" });
  }
});

//Edit profile
router.patch("/edit-profile", async (req, res) => {
  try {
    const { userId, username, profileImage, address, phoneNumber } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Update profile fields if provided
    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;

    // Update address fields if provided
    if (address !== undefined) {
      if (address.street) user.address.street = address.street;
      if (address.city) user.address.city = address.city;
      if (address.state) user.address.state = address.state;
      if (address.postalCode) user.address.postalCode = address.postalCode;
      if (address.country) user.address.country = address.country;
    }

    // Update phone number if provided
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).send({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        address: user.address,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error updating user profile", error);
    res.status(500).send({ message: "Error updating user profile" });
  }
});

// Verify OTP endpoint
// Verify OTP endpoint
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if OTP matches and has not expired
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).send({ message: "Invalid or expired OTP" });
    }

    // Mark user as verified and clear OTP details
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Send a "Thanks for Registering" email to the user
    await sendThanksEmail(user.email, user.username);

    // Send a notification email with user registration details to the team
    await sendAdminNotification(user);

    res.status(200).send({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP", error);
    res.status(500).send({ message: "Error verifying OTP" });
  }
});

// Resend OTP endpoint
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry
    await user.save();

    await sendOTPEmail(email, otp, user.username);

    res.status(200).send({ message: "OTP resent successfully!" });
  } catch (error) {
    console.error("Error resending OTP", error);
    res.status(500).send({ message: "Error resending OTP" });
  }
});



// Request password reset with OTP
router.post("/request-password-reset", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // Generate a 6-digit OTP and set expiration
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Save as string
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

    user.resetToken = otp; // Store the OTP as resetToken
    user.tokenExpires = otpExpires; // Set the OTP expiration
    await user.save();

    // Send the OTP to the user's email
    await sendOTPEmail(
      email,
      `Password Reset OTP`,
      `Hello ${user.username},<br/><br/>
      We received a request to reset your password. Use the OTP below to reset it:<br/>
      <strong>${otp}</strong><br/><br/>
      This OTP is valid for 15 minutes.<br/><br/>
      If you did not request this, please ignore this email.<br/><br/>
      Thanks,<br/>Your Team`
    );

    res.status(200).send({ message: "OTP sent to your email!" });
  } catch (error) {
    console.error("Error requesting password reset", error);
    res.status(500).send({ message: "Error requesting password reset" });
  }
});

// Reset password using OTP
// Reset password using OTP
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body; // Ensure the field name matches the frontend

    // Find user with matching OTP and valid expiry
    const user = await User.findOne({
      resetToken: token.toString(), // Convert to string
      tokenExpires: { $gt: Date.now() }, // Ensure token hasn't expired
    });

    if (!user) {
      return res.status(400).send({ message: "Invalid or expired OTP" });
    }

    // Update password and clear reset token fields
    user.password = newPassword;
    user.resetToken = undefined;
    user.tokenExpires = undefined;
    await user.save();

    res.status(200).send({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});


module.exports = router;
