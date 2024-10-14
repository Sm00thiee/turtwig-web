export const isAuthenticated = () => {
  return document.cookie.includes('jwt_access='); // Check if the JWT cookie exists
};