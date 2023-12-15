const express=require("express");
const { addCategory, getCategory } = require("../controller/category");
const { adminMiddleware, requireSignin, upload } = require("../middleware");
const {validaterrequestCategory,isRequestValidate}=require("../validators/auth")
const router=express.Router();

router.post("/category/addcat",requireSignin,adminMiddleware,upload.single('categoryImage'),validaterrequestCategory,isRequestValidate,addCategory)
router.get("/category/getcat",getCategory)

module.exports = router;
