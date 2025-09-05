import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/user";
import { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: User;
}

interface User {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      if (!decoded) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
      req.user = (await User.findById(decoded.userId).select(
        "-password"
      )) as User;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }
);

export const isAdmin = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
  }
);
