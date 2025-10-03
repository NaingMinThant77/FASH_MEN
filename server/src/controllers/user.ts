import { Request, Response } from "express";
import { User } from "../models/user";
import asyncHandler from "../utils/asyncHandler";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middlewares/authMiddleware";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary";
import bcrypt from "bcryptjs";
import { forgetPasswordEmailTemplate } from "../utils/emailTemplate";
import { sendEmail } from "../utils/sendEmail";
import crypto from "crypto";

// @route POST | /api/register
// @desc Register a new user
// @access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = await User.create({ name, email, password });
    if (newUser) {
      res
        .status(201)
        .json({ _id: newUser._id, name: newUser.name, email: newUser.email });
    }
  }
);

// @route POST | /api/login
// @desc Login to existing user's account
// @access Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser && (await existingUser.matchPassword(password))) {
    // token generation
    generateToken(res, existingUser._id);

    res.status(200).json({
      _id: existingUser._id,
    });
  } else {
    res.status(401);
    throw new Error("User not found with this credentials.");
  }
});

// @route POST | /api/logout
// @desc Clear token.
// @access Public
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully." });
});

// @route POST | /api/upload
// @desc update or upload user avatar.
// @access Private
export const uploadAvatar = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { image_url } = req.body;

    const userDoc = await User.findById(user?._id);

    if (userDoc?.avatar?.url) {
      await deleteImage(userDoc.avatar.public_alt);
    }

    const response = await uploadSingleImage(image_url, "fash.com/avatar");

    await User.findByIdAndUpdate(user?._id, {
      avatar: {
        url: response.image_url,
        public_alt: response.public_alt,
      },
    });

    res.status(200).json({ message: "Avatar Uploaded Successfully." });
  }
);

// @route GET | /api/me
// @desc get login user's Information
// @access Private
export const getUserInfo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;

    const userInfo = await User.findById(user?._id).select("-password");
    res.status(200).json(userInfo);
  }
);

// @route GET | /api/update-email
// @desc update User's email
// @access Private
export const updateEmailAddress = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("Email is already owned by another user.");
    }
    await User.findByIdAndUpdate(user?._id, { email });
    res.status(200).json({ message: "Email updated successfully." });
  }
);

// @route GET | /api/update-name
// @desc update User's name
// @access Private
export const updateName = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { name } = req.body;
    await User.findByIdAndUpdate(user?._id, { name });
    res.status(200).json({ message: "ProfileName updated successfully." });
  }
);

// @route POST | /api/update-password
// @desc update User's password
// @access Private
export const updatePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { oldPassword, newPassword } = req.body;

    const existingUser = await User.findOne({ email: user?.email }).select(
      "password"
    );
    if (!existingUser) {
      res.status(400);
      throw new Error("User not found.");
    }

    const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Old password is incorrect.");
    }

    existingUser.password = newPassword;
    await existingUser.save();
    res.status(200).json({ message: "Password updated successfully." });
  }
);

// @route POST | /api/forget-password
// @desc send emial to reset password
// @access Private
export const sendForgetPasswordEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400);
      throw new Error("This email is not registered.");
    }
    const token = await existingUser.generatePasswordResetToken();
    await existingUser.save();

    const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const mailBody = forgetPasswordEmailTemplate(resetPasswordUrl);

    try {
      await sendEmail({
        receiver_mail: existingUser.email!,
        subject: "Reset Password - FASH_MEN",
        body: mailBody,
      });
    } catch (error) {
      existingUser.resetPasswordExpire = undefined;
      existingUser.resetPasswordToken = undefined;
      await existingUser.save();
    }

    res.status(200).json({ message: "ResetPassword Email sent successfully." });
  }
);

// @route POST | /api/reset-password/:token
// @desc change user's password
// @access Private
export const resetPassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400);
      throw new Error("Token is invalid or has been expired.");
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({ message: "Password updated successfully." });
  }
);

// @route GET | /api/users
// @desc get all users
// @access Admin
export const getAllUsers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  }
);
