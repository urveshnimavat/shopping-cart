const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/cartApi", {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})