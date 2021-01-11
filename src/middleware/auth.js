const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const user = await User.findOne({ _id: decoded, "tokens.token": token });

    if (!user) {
        throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
};

module.exports = auth;
