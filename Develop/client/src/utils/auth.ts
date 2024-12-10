import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      try {
        // Decode and return the payload of the token
        return jwtDecode<JwtPayload>(token);
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    // Check if token is present and not expired
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const exp = decoded.exp ? decoded.exp * 1000 : 0; // Convert to milliseconds
      return Date.now() >= exp; // Token expired if current time >= expiry time
    } catch (error) {
      console.error('Error checking token expiration', error);
      return true; // If error occurs, treat the token as expired
    }
  }

  getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  login(idToken: string) {
    // Set token to localStorage and redirect to the home page
    localStorage.setItem('jwtToken', idToken);
    window.location.href = '/';
  }

  logout() {
    // Remove token from localStorage and redirect to the login page
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  }
}

export default new AuthService();
