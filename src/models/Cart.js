const mongoose = require("mongoose");
require("../db/conn");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
