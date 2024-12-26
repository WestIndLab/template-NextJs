import { IAuthRepository } from "../../../../shared/modules/auth/domain/repositories/IAuthRepository";
import {
  AuthCredentials,
  AuthResponse,
} from "../../../../shared/modules/auth/entities/AuthCredentials";
import { API_URL } from "../../config";

export class AuthRepository implements IAuthRepository {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  }

  async logout(): Promise<void> {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });
  }

  async refreshToken(token: string): Promise<string> {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    return data.token;
  }
}
