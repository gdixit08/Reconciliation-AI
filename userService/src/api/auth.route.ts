import express, { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { AuthRepository } from "../repository/auth.repository";
import { ChangePasswordRequest, SigninRequest, SignupRequest, UpdatedUserRequest } from "../dto/auth.dto";
import { RequestValidator } from "../utils/requestValidator";
import { AccessTokenOptions, RefreshTokenOptions } from "../utils";
import Authenticate from "../middleware/authenticate";

const router = express.Router();

export const authService = new AuthService(new AuthRepository());

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(SignupRequest, req.body);
      if (errors) {
        res.status(400).json(errors);
        return;
      }
      const { user: data, tokens } = await authService.createUser(input);
      res.cookie("accessToken", tokens.accessToken, AccessTokenOptions);
      res.cookie("refreshToken", tokens.refreshToken, RefreshTokenOptions);

      res.status(201).json({
        message: "User created successfully",
        success: true,
        data: {
          id: data?.id,
          email: data?.email,
          company_name: data?.Company_Name,
          is_verified: data?.is_verified,
        },
      });
    } catch (error) {
      next(error);
      return;
    }
  }
);

router.post("/signin", async (req: Request, res: Response, next: Function) => {
  try {
    const { errors, input } = await RequestValidator(SigninRequest, req.body);
    if (errors) {
      res.status(400).json(errors);
      return;
    }
    const result = await authService.loginUser(input);
    if (!result) {
      res.status(500).json({ message: "Login failed. Please try again." });
      return;
    }
    const { user: data, tokens } = result;
    res.cookie("accessToken", tokens.accessToken, AccessTokenOptions);
    res.cookie("refreshToken", tokens.refreshToken, RefreshTokenOptions);
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: {
        id: data?.id,
        email: data?.email,
        company_name: data?.Company_Name,
        is_verified: data?.is_verified,
      },
    });
  } catch (error) {
    next(error);
    return;
  }
});

router.get(
  "/getUserProfile",
  Authenticate,
  async (req: Request, res: Response, next: Function) => {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      res.status(200).json({
        message: "User fetched successfully",
        success: true,
        data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          company_name: user.company_name,
          phone_number: user.phone_number,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      next(error);
      return;
    }
  }
);

router.patch(
  "/updateUserProfile",
  Authenticate,
  async (req: Request, res: Response, next: Function) => {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { errors, input } = await RequestValidator(UpdatedUserRequest, req.body);
      if (errors) {
        res.status(400).json(errors);
        return;
      }

      const updatedUser = await authService.updateUserProfile(user.email, input);
      res.status(200).json({
        message: "User profile updated successfully",
        success: true,
        data: {
          id: updatedUser.id,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          email: updatedUser.email,
          company_name: updatedUser.Company_Name,
          phone_number: updatedUser.phone_number,
          profilePicture: updatedUser.profile_picture,
        },
      });
    } catch (error) {
      next(error);
      return;
    }
  }
);

router.patch(
  "/change-password",
  Authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { errors, input } = await RequestValidator(ChangePasswordRequest, req.body);
      if (errors) {
        res.status(400).json(errors);
        return;
      }

      const result = await authService.changePassword(user.email, input);
      if (!result.success) {
        res.status(400).json({
          message: result.message || "Failed to change password",
          success: false,
        });
        return;
      }

      res.status(200).json({
        message: "Password changed successfully",
        success: true,
      });
    } catch (error) {
      next(error);
      return;
    }
  }
);

export default router;
