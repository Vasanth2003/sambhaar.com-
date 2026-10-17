const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  isFirstTime: {
    type: Boolean,
    default: true,
  },
  otp: String,
  otpExpires: Date,

  isPhoneVerified: {
    type: Boolean,
    default: false,
  },

  // 👤 USER INFO (collect after login)
  name: {
    type: String,
    // trim: true,
  },

  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },

  role: {
    type: String,
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);

// const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new Schema({
//   username: { type: String, required: false, unique: true },

//   email: {
//     type: String,
//     required: false, // ❗ make optional for OTP users
//     unique: true,
//     sparse: true, // ✅ allows multiple null values
//     validate: {
//       validator: function (v) {
//         return !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
//       },
//       message: (props) => `${props.value} is not a valid email address!`,
//     },
//   },

//   password: { type: String },

//   // 🔥 OTP FIELDS
//   otp: { type: String },
//   otpExpires: { type: Date },

//   isVerified: { type: Boolean, default: false },

//   role: { type: String, default: "user" },
//   profileImage: String,

//   createdAt: { type: Date, default: Date.now },

//   address: {
//     street: String,
//     city: String,
//     state: String,
//     postalCode: String,
//     country: String,
//   },

//   phoneNumber: {
//     type: String,
//     unique: true,       // ✅ important
//     sparse: true,       // ✅ allows old users without number
//     validate: {
//       validator: function (v) {
//         return !v || /^\d{10}$/.test(v);
//       },
//       message: (props) => `${props.value} is not a valid phone number!`,
//     },
//   },

//   // 🔥 NEW FIELD (IMPORTANT)
//   isPhoneVerified: { type: Boolean, default: false },

//   resetToken: String,
//   tokenExpires: Date,

//   isGoogleUser: { type: Boolean, default: false },
// });


// // 🔐 Hash password
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });


// // 🔐 Compare password
// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// const User = model("User", userSchema);
// module.exports = User;