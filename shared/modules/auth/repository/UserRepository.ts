import { API_ROUTES } from '@template/shared/conf/api.routes';
import { IHttpClient } from '@template/shared/infrastructure/http';
import { CommonErrorCode } from '@template/shared/types/common';
import { IUserRepository } from '../gateway/IUserRepository';
import { User } from '../models/user-model';
import { UserError } from '../models/user-model/errors';
import { SavedUser, UnsavedUser, UserErrorCode } from '../models/user-model/types';

export class UserRepository implements IUserRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getUser(id: string): Promise<User> {
    try {
      const user = await this.httpClient.get<SavedUser>(API_ROUTES.USERS.BY_ID(id));
      return new User(user);
    } catch (error) {
      throw new UserError(CommonErrorCode.NOT_FOUND);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const response = await this.httpClient.get<SavedUser>(API_ROUTES.USERS.BY_EMAIL(email));
      return new User(response);
    } catch (error) {
      throw new UserError(CommonErrorCode.NOT_FOUND);
    }
  }

  async updateUser(user: User): Promise<void> {
    try {
      user.ensurePersisted();
      await this.httpClient.put<void>(API_ROUTES.USERS.BY_ID(user.id), user.toJSON());
    } catch (error) {
      if (error instanceof UserError) {
        throw error; // Propager l'erreur de ensurePersisted
      }
      throw new UserError(CommonErrorCode.DATABASE_ERROR, 'Erreur lors de la mise à jour');
    }
  }

  async updateUserLastLogin(id: string): Promise<void> {
    try {
      await this.httpClient.patch<void>(API_ROUTES.USERS.BY_ID(id), { lastLogin: new Date() });
    } catch (error) {
      throw new UserError(
        CommonErrorCode.DATABASE_ERROR,
        'Erreur lors de la mise à jour de la dernière connexion',
      );
    }
  }

  async createUser(userData: Omit<UnsavedUser, 'createdAt'>): Promise<User> {
    try {
      const newUserData: UnsavedUser = {
        ...userData,
        createdAt: new Date(),
      };

      const savedUser = await this.httpClient.post<SavedUser>(API_ROUTES.USERS.BASE, newUserData);
      return new User(savedUser);
    } catch (error) {
      if (error instanceof UserError && error.code === UserErrorCode.EMAIL_ALREADY_EXISTS) {
        throw error;
      }
      throw new UserError(
        CommonErrorCode.DATABASE_ERROR,
        "Erreur lors de la création de l'utilisateur",
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.httpClient.delete(API_ROUTES.USERS.BY_ID(id));
    } catch (error) {
      throw new UserError(CommonErrorCode.NOT_FOUND);
    }
  }

  async changePassword(id: string, newPassword: string): Promise<void> {
    try {
      await this.httpClient.patch(`${API_ROUTES.USERS.BY_ID(id)}/password`, {
        password: newPassword,
      });
    } catch (error) {
      if (error instanceof UserError && error.code === UserErrorCode.INVALID_PASSWORD) {
        throw error;
      }
      throw new UserError(CommonErrorCode.DATABASE_ERROR);
    }
  }
}
