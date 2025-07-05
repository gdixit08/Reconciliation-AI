import { IAuthRepository } from "../interface/auth.interface";
import { DB } from "../db/db.connection";
import { Signup } from "../model/auth.model";
import { User, users } from "../db/schema";
import { eq, Update } from "drizzle-orm";
import { UpdatedUserRequest } from "../dto/auth.dto";

export class AuthRepository implements IAuthRepository {
  _db: typeof DB;
  constructor() {
    this._db = DB;
  }
  async signup(data: Signup): Promise<User> {
    const [newUser] = await this._db.insert(users).values(data).returning();
    return newUser;
  }
  async FindCustomer({ email }: { email: string }): Promise<User> {
    const existingCustomer = await this._db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
    return existingCustomer as User;
  }
  // async FindUserByPhoneNumber({
  //   phone_number,
  // }: {
  //   phone_number: string;
  // }): Promise<Boolean> {
  //   const existingCustomer = await this._db
  //     .select({ phone_number: users.phone_number })
  //     .from(users)
  //     .where(eq(users.phone_number, phone_number))
  //     .limit(1);
  //   console.log(existingCustomer);
  //   return existingCustomer.length > 0;
  // }

  /**
   * Updates the refresh token for a user
   * @param userId - The user's ID
   * @param refreshToken - The new refresh token to store
   * @returns void
   */
  async UpdateRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<void> {
    await this._db
      .update(users)
      .set({ refresh_token:refreshToken })
      .where(eq(users.id, userId))
      .returning();
  }
  async UpdateUserProfile(
    email: string,
    input: UpdatedUserRequest
  ): Promise<User> {
    const [updatedUser] = await this._db
      .update(users)
      .set(input)
      .where(eq(users.email, email))
      .returning();
    return updatedUser;
  }
  async updateUserPassword(
    email: string,
    newPassword: string
  ): Promise<User> {
    const [changePasswordUser] =await this._db
      .update(users)
      .set({ password:newPassword })
      .where(eq(users.email, email))
      .returning();
    return changePasswordUser;
  }
}
