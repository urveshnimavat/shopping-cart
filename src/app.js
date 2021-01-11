const express = require("express");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const app = express();
require("dotenv").config();

const port = process.env.PORT;

app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("welcome to homepage");
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
