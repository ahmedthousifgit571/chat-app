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

export const logIn = async(req, res) => {
  const {password,email} = req.body
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        statusCode:400,
        message:"invalid credentials"
      })
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
      return res.status(400).json({
        statusCode:400,
        message:"invalid credentials"
      })
    }
    generateToken(user._id,res)
    return res.status(200).json({
      message:"login successfully",
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic:user.profilePic
    })
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({
      statusCode: 500,
      message: "internal server error",
    });
  }
};

export const logout = async(req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({
      statusCode: 500,
      message: "internal server error",
    });
  }
};

export const updateProfile = async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}
