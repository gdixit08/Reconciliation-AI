import { ChangePasswordRequest } from "../dto/auth.dto";
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
          refreshToken 
        }
      };
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof APIError) {
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
      await this._repository.UpdateRefreshToken(existingCustomer.id, refreshToken);
      existingCustomer.refresh_token = refreshToken;
      
      return {
        user: existingCustomer,
        tokens: {
          accessToken,
          refreshToken 
        }
      };
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof APIError) {
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
 // Add this method to your AuthService class


async changePassword(
  userId: string, 
  input: ChangePasswordRequest
): Promise<{ success: boolean; message?: string }> {
  try {
    const { currentPassword, newPassword, confirmPassword } = input;

    // Validate that new password and confirm password match
    if (newPassword !== confirmPassword) {
      return {
        success: false,
        message: "New password and confirm password do not match"
      };
    }

    // Get user from database
    const user = await this.authRepository.findUserById(userId);
    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return {
        success: false,
        message: "Current password is incorrect"
      };
    }

    // Check if new password is different from current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return {
        success: false,
        message: "New password must be different from current password"
      };
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password in database
    await this.authRepository.updateUserPassword(userId, hashedNewPassword);

    return {
      success: true,
      message: "Password changed successfully"
    };
  } catch (error) {
    console.error('Error changing password:', error);
    return {
      success: false,
      message: "Internal server error"
    };
  }


