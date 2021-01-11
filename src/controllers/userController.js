const User = require("../models/User");
const sharp = require("sharp");
const responseHelper = require("../helpers/responseHelper");

//create new user
exports.createUser = async (req, res) => {
    const userData = req.body;
    try {
        const user = User(userData);
        await user.save();
        console.log("New user saved..");
        return responseHelper.successapi(res, "Created user", 201, user);
    } catch (err) {
        return responseHelper.error(res, "User creation error", 400, err);
    }
};

//login user
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateToken();
        return responseHelper.successapi(res, "Login successful", 200, {
            user,
            token,
        });
    } catch (err) {
        return responseHelper.error(res, "Login failed", 400, err);
    }
};

//logout user
exports.logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tempToken) => {
            return req.token !== tempToken.token;
        });
        await req.user.save();
        console.log("logout done");
        return responseHelper.successapi(res, "Logout successful!", 204);
    } catch (err) {
        return responseHelper.error(res, "logout failed", 400, err);
    }
};

//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const usersData = await User.find({});
        return responseHelper.successapi(res, "All users", 200, usersData);
    } catch (err) {
        return responseHelper.error(res, "users not found!", 500, err);
    }
};

//update user by id
exports.updateUserById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "age", "password"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        res.status(400).send({ error: "invalid updates!" });
        return responseHelper.error(res, "invalid updates!", 400);
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        console.log("update user by id...");

        if (!user) {
            return responseHelper.error(res, "invalid user information!", 404);
        }
        return responseHelper.successapi(
            res,
            "user updated successfully!",
            205,
            user
        );
    } catch (err) {
        return responseHelper.error(res, "invalid updation request", 400);
    }
};

//delete user by id
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        console.log("User deleted..");

        if (!user) {
            return responseHelper.error(res, "invalid user information!", 404);
        }
        return responseHelper.successapi(
            res,
            "user deleted successfully!",
            204,
            user
        );
    } catch (err) {
        return responseHelper.error(res, "users not found!", 500, err);
    }
};

//upload avatar
exports.uploadAvatar = async (req, res) => {
    try{
        const buffer = await sharp(req.file.buffer)
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();
        req.user.avatar = buffer;
        await req.user.save();
        return responseHelper.successapi(
            res,
            "avatar uploaded successfully!",
            201
        );
    }
    catch(err){
        return responseHelper.error(res, "invalid updation request", 400);

    }
}

//view avatar
exports.viewAvatar = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        
        if (!user || !user.avatar) {
            throw new Error("Sorry! No data found");
        }

        res.set("Content-Type", "image/png");
        res.status(200).send(user.avatar);
    } catch (err) {
        return responseHelper.error(res, "invalid request", 400);
    }
};
