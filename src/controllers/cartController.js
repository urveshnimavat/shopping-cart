const Cart = require("../models/Cart");

//add product to cart
exports.addToCart = async (req, res) => {
    try {
        const cart = new Cart({
            ...req.body,
            userId: req.user._id,
        });
        await cart.save();
        return responseHelper.successapi(res, "Created cart", 201, cart);
    } catch (err) {
        return responseHelper.error(res, "invalid request", 400, err);
    }
};

//view products in cart
exports.viewUserCart = async (req, res) => {
    try {
        const carts = await Cart.find({ userId: req.user._id })
            .populate("productId")
            .exec();
        console.log("user cart");
        return responseHelper.successapi(res, "user cart", 200, carts);
    } catch (err) {
        return responseHelper.error(res, "invalid request", 400, err);
    }
};

//remove products from cart
exports.removeProductById = async (req, res) => {
    try {
        const product = await Cart.deleteOne({ productId: req.params.id });
        return responseHelper.successapi(
            res,
            "product deleted successfully!",
            204,
            product
        );
    } catch (err) {
        return responseHelper.error(res, "invalid request", 400, err);
    }
};
