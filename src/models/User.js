const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        toLowerCase: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        toLowerCase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address!");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    //step1
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    avatar: {
        type: Buffer
    },
    resetLink:{
        type:String,
    }
},{
    timestamps: true
});

userSchema.virtual("carts", {
    ref: "Cart",
    localField: "_id",
    foreignField: "userId",
});

//step2
userSchema.methods.generateToken = async function () {
    const user = this;
    console.log(user);
    const token = await jwt.sign(
        { _id: user._id.toString() },
        process.env.TOKEN_SECRET_KEY
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Unable to login!");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid information!");
    }
    return user;
};

//mongoose middleware to hash the password
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
