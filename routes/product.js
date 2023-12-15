const express=require("express")
const { addProduct,getProduct } = require("../controller/product")
const { requireSignin, adminMiddleware, upload } = require("../middleware")
const {validaterrequestProduct,isRequestValidate}=require("../validators/auth")
const router=express.Router();

router.post("/product/addproduct",requireSignin,adminMiddleware,upload.array('productPicture'),validaterrequestProduct,isRequestValidate,addProduct)
router.get("/product/getproduct",getProduct)

module.exports=router