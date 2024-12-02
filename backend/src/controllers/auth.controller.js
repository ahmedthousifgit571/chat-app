import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (password.length < 6) {
      return res.status(400).json({
        statusCode: 400,
        message: "password must be atleast 6 characters",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        statusCode: 400,
        message: "email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName:fullName,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser, res);
      await newUser.save();

      return res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "invalid user data",
      });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({
      statusCode: 500,
      message: "internal server error",
    });
  }
};

export const logIn = (req, res) => {};

export const logout = (req, res) => {};
