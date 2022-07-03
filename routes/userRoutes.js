const express= require('express')
const router = express.Router()
const {registerUser,loginUser,getMe,followUser, getUserById}=require("../controllers/userController")
const {protect}=require("../middleware/authMiddleware")

router.post("/register",registerUser)
router.post("/login", loginUser);
router.post("/me", getMe);
router.get("/:id",getUserById)
router.put("/:id/follow",protect, followUser);


module.exports= router