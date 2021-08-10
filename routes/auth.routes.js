const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validatorResult } = require("express-validator");
const User = require("../models/User");

const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Wrong e-mail address").isEmail(),
    check("password", "password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validatorResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Wrong credentials during Registration",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(400).json({ message: "The user already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User has been created" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter correct email address")
      .normalizeEmail()
      .isEmail(),
    check("password", "Please enter correct password"),
  ],
  async (req, res) => {
    try {
      const errors = validatorResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Wrong credentials during Login",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Wrong password, please try again" });
      }
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);

module.exports = router;
