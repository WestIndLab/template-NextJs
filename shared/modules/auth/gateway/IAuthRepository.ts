import { User } from "../models/user-model";

export interface IAuthRepository {
  login(credentials: { email: string; password: string }): Promise<string>;
  refreshToken(token: string): Promise<string>;
  register(user: User): Promise<void>;
}
