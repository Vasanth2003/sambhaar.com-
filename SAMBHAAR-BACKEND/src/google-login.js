// // const express = require("express");
// // const jwt = require("jsonwebtoken");
// // const User = require("./users/user.model"); // adjust if needed

// // const router = express.Router();
// // require("dotenv").config();

// // router.post("/google-login", async (req, res) => {
// //   console.log("here");
  
// //   const { credential } = req.body;
// //   console.log("Google login hit:", req.body);  // Check credential arriving

// //   try {
// //     if (!credential) {
// //       return res.status(400).json({ error: "Missing credential token" });
// //     }

// //     const decoded = jwt.decode(credential);

// //     if (!decoded?.email) {
// //       return res.status(400).json({ error: "Failed to decode token" });
// //     }
    
// //     const { email, name, picture, sub: googleId } = decoded;

// //     let user = await User.findOne({ email });

// //     if (user && !user.isGoogleUser && !user.isVerified) {
// //       console.log("Converting manual unverified user to Google user:", email);
// //       user.isVerified = true;
// //       user.isGoogleUser = true;
// //       user.googleId = googleId;
// //       user.profileImage = picture;
// //       await user.save();
// //     }

// //     if (!user) {
// //       user = new User({
// //         username: name,
// //         email,
// //         profileImage: picture,
// //         googleId,
// //         isGoogleUser: true,
// //         isVerified: true,
// //       });
// //       await user.save();
// //     } else {
// //       if (!user.isGoogleUser) {
// //         user.isGoogleUser = true;
// //         user.profileImage = picture;
// //         await user.save();
// //       }
// //     }

// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
// //       expiresIn: "7d",
// //     });

// //     res.status(200).json({ user, token });

// //   } catch (error) {
// //     console.error("Google login failed:", error.message);
// //     res.status(500).json({ error: "Something went wrong in Google login." });
// //   }
// // });

// // module.exports = router;


// // const express = require("express");
// // const jwt = require("jsonwebtoken");
// // const { OAuth2Client } = require("google-auth-library");
// // const User = require("./users/user.model"); // adjust if needed

// // const router = express.Router();
// // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // router.post("/google-login", async (req, res) => {
// //   try {
// //     const { credential } = req.body;
// //     if (!credential) {
// //       return res.status(400).json({ error: "Missing credential token" });
// //     }

// //     // ✅ Verify token with Google
// //     const ticket = await client.verifyIdToken({
// //       idToken: credential,
// //       audience: process.env.GOOGLE_CLIENT_ID,
// //     });

// //     const payload = ticket.getPayload();
// //     const { email, name, picture, sub: googleId } = payload;

// //     // ✅ Upsert user
// //     let user = await User.findOne({ email });

// //     if (!user) {
// //       user = new User({
// //         username: name,
// //         email,
// //         profileImage: picture,
// //         googleId,
// //         isGoogleUser: true,
// //         isVerified: true,
// //       });
// //       await user.save();
// //     } else {
// //       if (!user.isGoogleUser) {
// //         user.isGoogleUser = true;
// //       }
// //       user.profileImage = picture;
// //       user.isVerified = true;
// //       user.googleId = googleId;
// //       await user.save();
// //     }

// //     // ✅ Create your own JWT for frontend
// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
// //       expiresIn: "7d",
// //     });

// //     res.status(200).json({ user, token });
// //   } catch (error) {
// //     console.error("Google login failed:", error);
// //     res.status(500).json({ error: "Something went wrong in Google login." });
// //   }
// // });

// // module.exports = router;



// // routes/googleAuth.js
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require("google-auth-library");
// const User = require("./users/user.model"); // adjust path to your model

// const router = express.Router();

// // Initialize Google client
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // Google login route
// router.post("/google-login", async (req, res) => {
//   try {
//     const { credential } = req.body;

//     if (!credential) {
//       return res.status(400).json({ error: "Missing credential token" });
//     }

//     // ✅ Verify the Google token
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     if (!payload) {
//       return res.status(400).json({ error: "Invalid Google token" });
//     }

//     const { email, name, picture, sub: googleId } = payload;

//     if (!email) {
//       return res.status(400).json({ error: "Email not provided by Google" });
//     }

//     // ✅ Find or create user
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Create new user for first-time Google login
//       user = new User({
//         username: name || email.split("@")[0],
//         email,
//         profileImage: picture || null,
//         googleId,
//         isGoogleUser: true,
//         isVerified: true,
//       });
//       await user.save();
//     } else {
//       // Update existing user details
//       user.googleId = googleId;
//       user.isGoogleUser = true;
//       user.isVerified = true;
//       if (picture) user.profileImage = picture;
//       if (name && !user.username) user.username = name;
//       await user.save();
//     }

//     // ✅ Generate JWT for frontend
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       message: "Google login successful",
//       user,
//       token,
//     });
//   } catch (error) {
//     console.error("Google login failed:", error);
//     res
//       .status(500)
//       .json({ error: "Something went wrong during Google login." });
//   }
// });

// module.exports = router;




// routes/googleAuth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("./users/user.model"); // adjust path to your model

const router = express.Router();

// Initialize Google client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", async (req, res) => {
  try {
    console.log("Google login hit, body:", req.body);

    const { credential } = req.body;
    if (!credential) {
      console.error("❌ Missing credential");
      return res.status(400).json({ error: "Missing credential token" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("✅ Google Payload:", payload);

    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      console.log("Creating new Google user:", email);
      user = new User({
        username: name,
        email,
        profileImage: picture,
        googleId,
        isGoogleUser: true,
        isVerified: true,
      });
      await user.save();
    } else {
      console.log("Updating existing user:", email);
      user.isGoogleUser = true;
      user.profileImage = picture;
      user.isVerified = true;
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json({ user, token });

  } catch (error) {
    console.error("❌ Google login failed:", error.message);
    console.error(error.stack);
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;
