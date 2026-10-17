// const mongoose = require("mongoose");

// const subscriptionSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       match: /.+\@.+\..+/,
//     },
//     phone: {
//       type: String,
//       required: true,
//       match: /^[0-9]{10}$/, // Assumes a 10-digit phone number
//     },
//     // address: {
//     //     street: { type: String, required: true, },
//     //     city: { type: String, required: true },
//     //     state: { type: String, required: true },
//     //     postalCode: { type: String, required: true },
//     //     country: { type: String, required: true },
//     //   },
// //     address: {
// //   type: {
// //     street: { type: String, required: true },
// //     city: { type: String, required: true },
// //     state: { type: String, required: true },
// //     postalCode: { type: String, required: true },
// //     country: { type: String, required: true },
// //   },
// //   required: true,
// // },

// address: {
//   type: new mongoose.Schema(
//     {
//       street: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       postalCode: { type: String, required: true },
//       country: { type: String, required: true },
//     },
//     { _id: false } // Optional: prevent _id field inside address
//   ),
//   required: true,
// },


//     duration: {
//       type: Number,
//       enum: [1, 3, 6, 12], // Duration in months
//       required: true,
//     },
//     startDate: {
//       type: Date,
//       required: true,
//     },
//     subscriptionId: { type: String, required: true, unique: true },
//     milks: [
//       {
//         milkId: { type: String, required: true },
//         quantity: { type: Number, required: true },
//         name: {
//           type: String,
//           required: true,
//         },
//         category: {
//           type: String,
//           enum: ["aavin", "arokya"],
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//         weight: {
//           type: String,
//           required: true,
//         },
//         image: {
//           type: String,
//           required: true,
//         },
//       },
//     ],
//     amount: { type: Number, required: true },
//     subscriptionStatus: {
//         type: String,
//         enum: ["Active", "Paused", "Cancelled", "Completed"],
//       },
//     paymentMethod: {
//       type: String,
//       enum: ["Cash", "Phonepe"],
//       default: "Cash",
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Success", "Failed"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// const Subscription = mongoose.model("Subscription", subscriptionSchema);
// module.exports = Subscription;



const mongoose = require("mongoose");

// ✅ 1. Define addressSchema separately first
const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

// ✅ 2. Use that schema in your subscriptionSchema
const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    duration: { 
      type: Number,
      enum: [1, 3, 6, 12],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    subscriptionId: {
      type: String,
      required: true,
      unique: true,
    },
    milks: [
      {
        milkId: { type: String, required: true },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
        category: {
          type: String,
          enum: ["aavin", "arokya"],
          required: true,
        },
        price: { type: Number, required: true },
        weight: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    amount: { type: Number, required: true },
    subscriptionStatus: {
      type: String,
      enum: ["Active", "Paused", "Cancelled", "Completed"],
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Phonepe"],
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
