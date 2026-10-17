const comboSchema = new mongoose.Schema({
  title: String,
  description: String,

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],

  comboPrice: Number,
  originalPrice: Number,
  discountPercentage: Number,

  image: String,

  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });