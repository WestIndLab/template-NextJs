import { DEFAULT_PREFERENCES } from './constants';
import { UserError } from './errors';
import {
  CreateUserParams,
  SavedUser,
  UnsavedUser,
  UserErrorCode,
  UserPreferences,
  UserProfile,
  isSavedUser,
} from './types';
import { isValidEmail } from './utils';

export class User {
  private readonly data: UnsavedUser | SavedUser;

  constructor(params: CreateUserParams & { id?: string }) {
    if (!Boolean(isValidEmail(params.email))) {
      throw new UserError(UserErrorCode.INVALID_EMAIL);
    }

    this.data = {
      ...params,
      createdAt: new Date(),
      preferences: { ...DEFAULT_PREFERENCES, ...params.preferences },
    };
  }

  get id(): string | undefined {
    return (this.data as SavedUser).id;
  }

  get email(): string {
    return this.data.email;
  }

  get password(): string {
    return this.data.password;
  }

  get lastName(): string {
    return this.data.lastName;
  }

  get firstName(): string {
    return this.data.firstName;
  }

  get createdAt(): Date | undefined {
    return this.data.createdAt;
  }

  get lastLogin(): Date | undefined {
    return this.data.lastLogin;
  }

  get avatar(): string | undefined {
    return this.data.avatar;
  }

  get preferences(): UserPreferences {
    return this.data.preferences as UserPreferences;
  }

  public profile(): UserProfile {
    return {
      email: this.email,
      lastName: this.lastName,
      firstName: this.firstName,
      avatar: this.avatar,
    };
  }

  public updateLastLogin(): void {
    this.data.lastLogin = new Date();
  }

  public isPersisted(): boolean {
    return isSavedUser(this.data);
  }

  public ensurePersisted(): asserts this is User & { id: string } {
    if (!this.isPersisted()) {
      throw new Error('User must be persisted for this operation');
    }
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...this.data,
    };
  }
}
