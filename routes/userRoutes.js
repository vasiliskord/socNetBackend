const express= require('express')
const router = express.Router()
const {registerUser,loginUser,getMe,followUser}=require("../controllers/userController")
const {protect}=require("../middleware/authMiddleware")

router.post("/register",registerUser)
router.post("/login", loginUser);
router.post("/me", getMe);
router.put("/follow",protect, followUser);


module.exports= router