const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    uploadAvatar,
    viewAvatar,
} = require("../controllers/userController");

const upload = multer({
    // dest:"avatar",
    limits: {
        fileSize: 1024 * 1024 * 1024, //1024*1024 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            return cb(new Error("Please upload image"));
        }
        cb(undefined, true);
    },
});

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.post("/logout", auth, logoutUser);
router.get("/get-all-users", getAllUsers);
router.patch("/updateUserById/:id", updateUserById);
router.delete("/deleteUserById/:id", deleteUserById);
router.post("/me/uploadAvatar", auth, upload.single("avatar"), uploadAvatar);
router.get("/:id/avatar", viewAvatar);

module.exports = router;
