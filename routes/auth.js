const express = require("express");
const { signUp, Login } = require("../controller/auth");
const {
  validaterequestSignup,
  validaterequestSignin,
  isRequestValidate,
} = require("../validators/auth");

const router = express.Router();

router.post("/signup", validaterequestSignup, isRequestValidate, signUp);
router.post("/login",validaterequestSignin,isRequestValidate, Login);

module.exports = router;
