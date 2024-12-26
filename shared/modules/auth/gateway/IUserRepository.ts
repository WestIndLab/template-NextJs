import { User } from '../models/user-model';

export interface IUserRepository {
  /**
   * Récupère un utilisateur par son ID
   * @throws {UserError} avec code 'USER_NOT_FOUND' si l'utilisateur n'existe pas
   * @throws {UserError} avec code 'DATABASE_ERROR' en cas d'erreur de BDD
   */
  getUser(id: string): Promise<User>;

  /**
   * Récupère un utilisateur par son email
   * @throws {UserError} avec code 'USER_NOT_FOUND' si l'utilisateur n'existe pas
   * @throws {UserError} avec code 'DATABASE_ERROR' en cas d'erreur de BDD
   */
  getUserByEmail(email: string): Promise<User>;

  /**
   * Met à jour un utilisateur
   * @throws {UserError} avec code 'USER_NOT_FOUND' si l'utilisateur n'existe pas
   * @throws {UserError} avec code 'DATABASE_ERROR' en cas d'erreur de BDD
   */
  updateUser(user: User): Promise<void>;

  /**
   * Met à jour la dernière connexion d'un utilisateur
   * @throws {UserError} avec code 'USER_NOT_FOUND' si l'utilisateur n'existe pas
   * @throws {UserError} avec code 'DATABASE_ERROR' en cas d'erreur de BDD
   */
  updateUserLastLogin(id: string): Promise<void>;
  /**
   * Crée un nouvel utilisateur
   * @throws {UserError} avec code 'EMAIL_ALREADY_EXISTS' si l'email existe déjà
   * @throws {UserError} avec code 'DATABASE_ERROR' en cas d'erreur de BDD
   */
  createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;

  /**
   * Supprime un utilisateur
   * @throws {UserError} avec code 'USER_NOT_FOUND' si l'utilisateur n'existe pas
   * @throws {UserError} avec code 'DATABASE_ERROR' en cas d'erreur de BDD
   */
  deleteUser(id: string): Promise<void>;

  /**
   * Change le mot de passe d'un utilisateur
   * @throws {UserError} avec code 'USER_NOT_FOUND' si l'utilisateur n'existe pas
   * @throws {UserError} avec code 'DATABASE_ERROR' en cas d'erreur de BDD
   */
  changePassword(id: string, newPassword: string): Promise<void>;
}
