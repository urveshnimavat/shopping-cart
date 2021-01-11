const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    addToCart,
    viewUserCart,
    removeProductById,
} = require("../controllers/cartController");

router.post("/addToCart", auth, addToCart);
router.get("/viewUserCart", auth, viewUserCart);
router.delete("/removeProductById/:id", auth, removeProductById);

module.exports = router;
