export const isAuthenticated = () => {
  return document.cookie.includes('jwt='); // Check if the JWT cookie exists
};