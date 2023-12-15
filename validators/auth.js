const { check, validationResult } = require("express-validator");

const validaterequestSignup = [
  check("firstName").notEmpty().withMessage("firstname is required"),
  check("lastName").notEmpty().withMessage("Lastname is required"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 charachter long"),
];
const validaterequestSignin = [
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 charachter long"),
];
const validaterrequestProduct = [
  check("name").notEmpty().withMessage("Name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("price").notEmpty().withMessage("Price is required").isNumeric().withMessage("Price Should be Number"),
  check("category").notEmpty().withMessage("Category is required"),
  check("quantity").notEmpty().withMessage("Quantity is required").isNumeric().withMessage("Quantity Should be Number"),
];
const validaterrequestCategory = [
  check("name").notEmpty().withMessage("Name is required"),

];

const isRequestValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

module.exports = { validaterequestSignup,validaterequestSignin,validaterrequestProduct,validaterrequestCategory, isRequestValidate };
