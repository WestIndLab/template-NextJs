import { LocalStorageService } from '@/src/infrastructure/storage/LocalStorageService';
import { AxiosHttpClient } from '@template/shared/infrastructure/http/AxiosHttpClient';
import { AuthRepository } from '@template/shared/modules/auth/repository/AuthRepository';
import { UserRepository } from '@template/shared/modules/auth/repository/UserRepository';
import { LoginOutput } from '@template/shared/modules/auth/usecases/login/login.output';
import { LoginUseCase } from '@template/shared/modules/auth/usecases/login/login.usecase';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Initialisation des dépendances
const localStorageService = new LocalStorageService();
const http = new AxiosHttpClient(localStorageService);
const authRepository = new AuthRepository(http);
const userRepository = new UserRepository(http);
const loginUseCase = new LoginUseCase(authRepository, userRepository);
///////
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const response: LoginOutput = await loginUseCase.execute({
            email: credentials.email,
            password: credentials.password,
          });

          return {
            id: response.data.id,
            email: response.data.email,
            name: `${response.data.firstName} ${response.data.lastName}`,
            accessToken: response.token,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
