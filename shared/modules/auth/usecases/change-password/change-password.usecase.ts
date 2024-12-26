import { IUserRepository } from '../../gateway/IUserRepository';

export class ChangePasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(id: string, newPassword: string): Promise<void> {
    return this.userRepository.changePassword(id, newPassword);
  }
}
