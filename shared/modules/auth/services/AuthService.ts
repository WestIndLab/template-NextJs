import { IAuthRepository } from '../gateway/IAuthRepository';
import { IUserRepository } from '../gateway/IUserRepository';
import { User } from '../models/user-model';
import { LoginInput } from '../usecases/login/login.input';
import { LoginOutput } from '../usecases/login/login.output';
import { LoginUseCase } from '../usecases/login/login.usecase';
import { RegisterInput } from '../usecases/register/register.input';
import { RegisterOutput } from '../usecases/register/register.output';
import { RegisterUseCase } from '../usecases/register/register.usecase';

export class AuthService {
  private readonly registerUseCase: RegisterUseCase;
  private readonly loginUseCase: LoginUseCase;

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authRepository: IAuthRepository,
  ) {
    this.registerUseCase = new RegisterUseCase();
    this.loginUseCase = new LoginUseCase();
  }

  async register(input: RegisterInput): Promise<RegisterOutput> {
    // La couche application orchestre les opérations
    const result = await this.registerUseCase.execute(input);

    if (result.success) {
      // Gestion de la persistance au niveau application
      const user = new User({ ...input });
      await this.userRepository.createUser(user);
    }

    return result;
  }

  async login(input: LoginInput): Promise<LoginOutput> {
    const result = await this.loginUseCase.execute(input);

    if (result.success) {
      try {
        // 2. Authentification via le repository
        const token = await this.authRepository.login(input);

        // 3. Récupération et mise à jour de l'utilisateur
        const user: User = await this.userRepository.getUserByEmail(input.email);

        // Vérification que l'utilisateur est bien persisté
        user.ensurePersisted();
        await this.userRepository.updateUserLastLogin(user.id);

        // 4. Retourne le token d'accès
        return {
          success: true,
          data: {
            accessToken: token,
          },
        };
      } catch (error) {
        return {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Email ou mot de passe incorrect',
          },
        };
      }
    }

    return result;
  }
}
