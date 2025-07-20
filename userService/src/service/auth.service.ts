import { UpdatedUserRequest, ChangePasswordRequest } from "../dto/auth.dto";
import { IAuthRepository } from "../interface/auth.interface";
import { Signin, Signup } from "../model/auth.model";
import {
  APIError,
  GenerateAccessToken,
  GeneratePassword,
  GenerateRefreshToken,
  GenerateSalt,
  NotFoundError,
  ValidatePassword,
  ValidationError,
} from "../utils";

export class AuthService {
  private _repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this._repository = repository;
  }

  async createUser(input: Signup) {
    try {
      const existingCustomer = await this._repository.FindCustomer({
        email: input.email,
      });
      if (existingCustomer) {
        throw new ValidationError("Email already exists");
      }

      const salt = await GenerateSalt();
      const userPassword = await GeneratePassword(input.password, salt);
      const data = await this._repository.signup({
        ...input,
        password: userPassword,
      });

      if (!data.id) {
        throw new NotFoundError("User not created");
      }

      const accessToken = await GenerateAccessToken({
        id: data.id,
        email: data.email,
      });
      if (typeof accessToken !== "string") {
        throw new APIError("Failed to generate access token");
      }

      const refreshToken = await GenerateRefreshToken({
        id: data.id,
        email: data.email,
      });
      if (typeof refreshToken !== "string") {
        throw new APIError("Failed to generate refresh token");
      }

      await this._repository.UpdateRefreshToken(data.id, refreshToken);
      data.refresh_token = refreshToken;

      return {
        user: data,
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof NotFoundError ||
        error instanceof APIError
      ) {
        throw error;
      }
      throw new APIError("Failed to create user");
    }
  }

  async loginUser(input: Signin) {
    try {
      const existingCustomer = await this._repository.FindCustomer({
        email: input.email,
      });
      if (!existingCustomer) {
        throw new NotFoundError("User not found");
      }

      const isPasswordValid = await ValidatePassword(
        input.password,
        existingCustomer.password
      );
      if (!isPasswordValid) {
        throw new ValidationError("Invalid password");
      }

      const accessToken = await GenerateAccessToken({
        id: existingCustomer.id,
        email: existingCustomer.email,
      });
      if (typeof accessToken !== "string") {
        throw new APIError("Failed to generate access token");
      }

      const refreshToken = await GenerateRefreshToken({
        id: existingCustomer.id,
        email: existingCustomer.email,
      });
      if (typeof refreshToken !== "string") {
        throw new APIError("Failed to generate refresh token");
      }

      await this._repository.UpdateRefreshToken(
        existingCustomer.id,
        refreshToken
      );
      existingCustomer.refresh_token = refreshToken;

      return {
        user: existingCustomer,
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof NotFoundError ||
        error instanceof APIError
      ) {
        throw error;
      }
    }
  }

  async validateUser(email: string) {
    try {
      const existingCustomer = await this._repository.FindCustomer({
        email: email,
      });
      if (!existingCustomer) {
        throw new NotFoundError("User not found");
      }
      return existingCustomer;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError("User not found");
      }
      throw new APIError("Something went wrong while validating user");
    }
  }

  async updateUserProfile(email: string, input: UpdatedUserRequest) {
    try {
      const existingCustomer = await this._repository.FindCustomer({
        email: email,
      });
      if (!existingCustomer) {
        throw new NotFoundError("User not found");
      }

      const updatedUser = await this._repository.UpdateUserProfile(
        existingCustomer.email,
        input
      );
      if (!updatedUser) {
        throw new NotFoundError("User not updated");
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof APIError) {
        throw error;
      }
      throw new APIError("Failed to update user profile");
    }
  }

  async changePassword(
    email: string,
    input: ChangePasswordRequest
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const { currentPassword, newPassword, confirmPassword } = input;

      if (newPassword !== confirmPassword) {
        return {
          success: false,
          message: "New password and confirm password do not match",
        };
      }

      const user = await this._repository.FindCustomer({
        email: email,
      });
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      const isCurrentPasswordValid = await ValidatePassword(
        currentPassword,
        user.password
      );
      if (!isCurrentPasswordValid) {
        return {
          success: false,
          message: "Current password is incorrect",
        };
      }

      const isSamePassword = await ValidatePassword(newPassword, user.password);
      if (isSamePassword) {
        return {
          success: false,
          message: "New password must be different from current password",
        };
      }

      const salt = await GenerateSalt();
      const hashedNewPassword = await GeneratePassword(newPassword, salt);

      const changePasswordUser=await this._repository.updateUserPassword(user.email, hashedNewPassword);
      if (!changePasswordUser) {
        return {
          success: false,
          message: "Failed to change password",
        };
      }
      return {
        success: true,
        message: "Password changed successfully",
      };
    } catch (error) {
      console.error("Error changing password:", error);
      return {
        success: false,
        message: "Internal server error",
      };
    }
  }
}
