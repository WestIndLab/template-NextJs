import { IAuthRepository } from '@/modules/auth/gateway/IAuthRepository';
import { API_ROUTES } from '@template/shared/conf/api.routes';
import { IHttpClient } from '../../../infrastructure/http/IHttpClient';
import { User } from '../models/user-model';

// DTO pour l'API
interface RegisterUserDTO {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}

export class AuthRepository implements IAuthRepository {
  constructor(private httpClient: IHttpClient) {}

  async register(user: User): Promise<void> {
    // Conversion des données en DTO pour l'API
    const userDTO: RegisterUserDTO = {
      email: user.email,
      password: user.password,
      lastName: user.lastName,
      firstName: user.firstName,
    };

    await this.httpClient.post<void>(API_ROUTES.AUTH.REGISTER, userDTO);
  }

  refreshToken(token: string): Promise<string> {
    return this.httpClient.post<string>(API_ROUTES.AUTH.REFRESH, { token });
  }

  async login(credentials: { email: string; password: string }): Promise<string> {
    const response = await this.httpClient.post<{ accessToken: string }>(
      API_ROUTES.AUTH.LOGIN,
      credentials,
    );
    return response.accessToken;
  }
}
