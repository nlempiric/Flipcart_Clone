const express=require("express");
const {signUp,Login}=require("../../controller/admin/auth")
const {validaterequestSignup,isRequestValidate, validaterequestSignin}=require("../../validators/auth")

const router=express.Router();

router.post("/admin/signup",validaterequestSignup,isRequestValidate,signUp)
router.post("/admin/login",validaterequestSignin,isRequestValidate,Login)

module.exports=router;

