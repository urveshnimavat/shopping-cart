const mongoose = require("mongoose");
require("../db/conn");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

productSchema.virtual("carts", {
    ref: "Cart",
    localField: "_id",
    foreignField: "productId",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
