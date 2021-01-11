const express = require("express");
const router = express.Router();
const {
    addProduct,
    getAllProducts,
    updateProductById,
    deleteProductbyId
} = require("../controllers/productController");

router.post("/newProduct", addProduct);
router.get("/getAllProducts", getAllProducts);
router.patch("/updateProductById/:id", updateProductById);
router.delete("/deleteProductById/:id", deleteProductbyId);

module.exports = router;
