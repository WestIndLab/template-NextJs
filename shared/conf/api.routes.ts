export type ApiRoutes = {
  AUTH: {
    BASE: string;
    LOGIN: string;
    LOGOUT: string;
    REFRESH: string;
    REGISTER: string;
  };
  USERS: {
    BASE: string;
    BY_ID: (id: string) => string;
    BY_EMAIL: (email: string) => string;
    PROFILE: string;
  };
  PRODUCTS: {
    BASE: string;
    BY_ID: (id: string) => string;
    SEARCH: string;
  };
};

export const API_ROUTES: ApiRoutes = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `${API_ROUTES.USERS.BASE}/${id}`,
    BY_EMAIL: (email: string) => `${API_ROUTES.USERS.BASE}?email=${email}`,
    PROFILE: '/users/me',
  },
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string) => `${API_ROUTES.PRODUCTS.BASE}/${id}`,
    SEARCH: '/products/search',
  },
} as const;
