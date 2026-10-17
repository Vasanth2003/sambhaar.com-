
// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const app = express();
// // require("dotenv").config();
// // const cookieParser = require("cookie-parser");
// // const bodyParser = require("body-parser");
// // const crypto = require("crypto");
// // const axios = require("axios");
// // const path = require("path");

// // const Order = require("./src/orders/orders.model"); // Adjust path as needed

// // const port = process.env.PORT || 4000;
// // const merchant_id = process.env.MERCHANT_ID;
// // const salt_key = process.env.SALT_KEY;

// // // ✅ CORS setup
// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:5173",
// //       "https://www.sambhaar.com",
// //       "https://sambhaar.com",
// //     ],
// //     credentials: true,
// //   })
// // );



// // app.use(express.json({ limit: "25mb" }));
// // app.use(cookieParser());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // // image upload util
// // const uploadImage = require("./src/utils/uploadImage");

// // // all routes
// // const authRoutes = require("./src/users/user.route");
// // const productRoutes = require("./src/products/products.route");
// // const orderRoutes = require("./src/orders/orders.route");
// // const statsRoutes = require("./src/stats/stats.route");
// // const reviewRoutes = require("./src/reviews/reviews.router");
// // const categoryRoutes = require("./src/category/categories.route");
// // const milkRoutes = require("./src/milkOptions/milks.route");
// // const blogRoutes = require("./src/blog/blogs.route");
// // const googleRoutes = require("./src/google-login");
// // const googleReviews = require("./src/reviews/googlereviews")
// // const subscriptionRoutes = require("./src/subscription/subscription.routes")
// // const brandRoutes = require("./src/brands/brands.route")

// // app.use("/api/auth", authRoutes);
// // app.use("/api/products", productRoutes);
// // app.use("/api/reviews", reviewRoutes);
// // app.use("/api/orders", orderRoutes);
// // app.use("/api/stats", statsRoutes);
// // app.use("/api/categories", categoryRoutes);
// // app.use("/api/milks", milkRoutes);
// // app.use("/api/blogs", blogRoutes);
// // app.use("/api/auth/google", googleRoutes);
// // app.use("/api/subscriptions",subscriptionRoutes);
// // app.use("/api/googlereviews",googleReviews);
// // app.use("/api/brands",brandRoutes);
// // // test route
// // app.get("/", (req, res) => {
// //   res.send("Sambhaar Server is running!");
// // });
// // app.use("/uploads", express.static("uploads"));
// // app.use("/products", express.static("products"));

// // app.use(
// //   "/products",
// //   express.static(path.join(__dirname, "products"))
// // );
// // // image upload route
// // app.post("/uploadImage", async (req, res) => {
// //   try {
// //     const { image } = req.body;
// //     const url = await uploadImage(image);
// //     res.send(url);
// //   } catch (err) {
// //     console.error("Image upload failed:", err);
// //     res.status(500).send({ error: "Failed to upload image" });
// //   }
// // });

// // // connect DB and start server
// // async function main() {
// //   await mongoose.connect(process.env.DB_URL);
// //   console.log("MongoDB connected successfully.");

// //   // app.listen(port, (port) => {
// //   //   console.log(`Server running on port ${port}`);
// //   // });

// //   app.listen(4000, "0.0.0.0", () => {
// //   console.log("Server running on all interfaces");
// // });

// // }


// // main().catch((err) => {
// //   console.error("DB connection error:", err);
// // });




// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const crypto = require("crypto");
// const axios = require("axios");
// const path = require("path");

// const Order = require("./src/orders/orders.model"); // Adjust path as needed

// const port = process.env.PORT || 4000;
// const merchant_id = process.env.MERCHANT_ID;
// const salt_key = process.env.SALT_KEY;

// // ✅ CORS setup
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://www.sambhaar.com",
//       "https://sambhaar.com",
//     ],
//     credentials: true,
//   })
// );



// app.use(express.json({ limit: "25mb" }));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // image upload util
// const uploadImage = require("./src/utils/uploadImage");

// // all routes
// const authRoutes = require("./src/users/user.route");
// const productRoutes = require("./src/products/products.route");
// const orderRoutes = require("./src/orders/orders.route");
// const statsRoutes = require("./src/stats/stats.route");
// const reviewRoutes = require("./src/reviews/reviews.router");
// const categoryRoutes = require("./src/category/categories.route");
// const milkRoutes = require("./src/milkOptions/milks.route");
// const blogRoutes = require("./src/blog/blogs.route");
// const googleRoutes = require("./src/google-login");
// const googleReviews = require("./src/reviews/googlereviews")
// const subscriptionRoutes = require("./src/subscription/subscription.routes")
// const brandRoutes = require("./src/brands/brands.route")

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/stats", statsRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/milks", milkRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/auth/google", googleRoutes);
// app.use("/api/subscriptions",subscriptionRoutes);
// app.use("/api/googlereviews",googleReviews);
// app.use("/api/brands",brandRoutes);
// // test route
// app.get("/", (req, res) => {
//   res.send("Sambhaar Server is running!");
// });
// app.use("/uploads", express.static("uploads"));
// app.use("/products", express.static("products"));

// app.use(
//   "/products",
//   express.static(path.join(__dirname, "products"))
// );
// // image upload route
// app.post("/uploadImage", async (req, res) => {
//   try {
//     const { image } = req.body;
//     const url = await uploadImage(image);
//     res.send(url);
//   } catch (err) {
//     console.error("Image upload failed:", err);
//     res.status(500).send({ error: "Failed to upload image" });
//   }
// });

// // async function fixIndex() {
// //   try {
// //     await mongoose.connect(process.env.DB_URL);
// //     console.log("✅ Connected");

// //     const collection = mongoose.connection.collection("users");

// //     // show indexes
// //     const indexes = await collection.indexes();
// //     console.log("📌 Indexes:", indexes);

// //     // drop username index
// //     await collection.dropIndex("username_1");
// //     console.log("🔥 username_1 dropped");

// //     // drop email index (recommended)
// //     await collection.dropIndex("email_1");
// //     console.log("🔥 email_1 dropped");

// //   } catch (err) {
// //     console.log("⚠️", err.message);
// //   } finally {
// //     await mongoose.disconnect();
// //     console.log("🔌 Disconnected");
// //   }
// // }

// // fixIndex();

// // connect DB and start server
// async function main() {
// //   console.log("DB URL:", process.env.DB_URL);
// //   await mongoose.connect(process.env.DB_URL);

  
// //   console.log("MongoDB connected successfully.");
// //  const indexes = await mongoose.connection.collection("users").indexes();
// //     console.log("📌 Existing Indexes:", indexes);
// //   // app.listen(port, (port) => {
// //   //   console.log(`Server running on port ${port}`);
// //   // });

// //   app.listen(4000, "0.0.0.0", () => {
// //   console.log("Server running on all interfaces");
// // });

// // ... rest of your imports like express, mongoose, etc.
// await mongoose.connect(process.env.DB_URL)
//   .then(() => {
//     console.log("MongoDB connected successfully.");
//   })
//   .catch((err) => {
//     console.log("MongoDB failed:", err.message);
//   });

// app.listen(4000, "0.0.0.0", () => {
//   console.log("Server running on all interfaces");
// });

// }


// main().catch((err) => {
//   console.error("DB connection error:", err);
// });

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const axios = require("axios");
const path = require("path");

// const Order = require("./src/orders/orders.model");

const port = process.env.PORT || 4000;
const merchant_id = process.env.MERCHANT_ID;
const salt_key = process.env.SALT_KEY;

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://www.sambhaar.com",
      "https://sambhaar.com",
      "https://sambhaar-h5lajs8ex-maverico.vercel.app"
    ],
    credentials: true,
  })
);

// Force Node.js to use Google's DNS



// ... rest of your code

app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// image upload util
const uploadImage = require("./src/utils/uploadImage");

// all routes
const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");
const orderRoutes = require("./src/orders/orders.route");
const statsRoutes = require("./src/stats/stats.route");
const reviewRoutes = require("./src/reviews/reviews.router");
const categoryRoutes = require("./src/category/categories.route");
const milkRoutes = require("./src/milkOptions/milks.route");
const blogRoutes = require("./src/blog/blogs.route");
const googleRoutes = require("./src/google-login");
const googleReviews = require("./src/reviews/googlereviews")
const subscriptionRoutes = require("./src/subscription/subscription.routes")
const brandRoutes = require("./src/brands/brands.route")

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/milks", milkRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth/google", googleRoutes);
app.use("/api/subscriptions",subscriptionRoutes);
app.use("/api/googlereviews",googleReviews);
app.use("/api/brands",brandRoutes);
// test route
app.get("/", (req, res) => {
  res.send("Sambhaar Server is running!");
});
app.use("/uploads", express.static("uploads"));
app.use("/products", express.static("products"));

app.use(
  "/products",
  express.static(path.join(__dirname, "products"))
);
app.post("/uploadImage", async (req, res) => {
  try {
    const { image } = req.body;
    const url = await uploadImage(image);
    res.send(url);
  } catch (err) {
    console.error("Image upload failed:", err);
    res.status(500).send({ error: "Failed to upload image" });
  }
});

// connect DB and start server
async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("MongoDB connected successfully.");

  // app.listen(port, (port) => {
  //   console.log(`Server running on port ${port}`);
  // });

  app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on all interfaces");
});

}


main().catch((err) => {
  console.error("DB connection error:", err);
});

