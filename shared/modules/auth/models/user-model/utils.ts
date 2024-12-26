/**
 * Formate le nom complet d'un utilisateur
 */
export const formatFullName: (firstName: string, lastName: string) => string = (
  firstName: string,
  lastName: string,
): string => {
  return `${firstName} ${lastName}`.trim();
};

/**
 * Vérifie si un email est valide
 */
export const isValidEmail: (email: string) => boolean = (email: string) => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
