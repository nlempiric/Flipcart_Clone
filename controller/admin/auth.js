const User = require("../../models/user");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const u = await User.findOne({ email });
    console.log("user found", u);
    if (!u) {
      const hash_password = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username: shortid.generate(),
        role: "admin",
      });
      newUser.save();
      return res
        .status(201)
        .json({ message: " Admin created successfully", user: newUser });
    } else {
      return res.json({ message: "Admin already exist" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Failed" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const u = await User.findOne({ email });
    if (u) {
      const result = await bcrypt.compare(password, u.hash_password);
      if (result && u.role === "admin") {
        const payload = { id: u._id, role: u.role };
        const token = await jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "2h",
        });
        console.log("accessToken", token);
        const { _id, firstName, lastName, email, role, fullName } = u;

        return res.status(200).json({
          message: "Admin Logged in",
          Token: token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.json({ message: "Invalid Password" });
      }
    } else {
      return res.json({ message: "Invalid Email" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Failed" });
  }
};

module.exports = { signUp, Login };
