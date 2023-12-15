const express=require("express");
const {addCart}=require("../controller/cart");
const { requireSignin, userMiddleware } = require("../middleware");
const router=express.Router();

router.post("/cart/addcart",requireSignin,userMiddleware,addCart)

module.exports = router;
