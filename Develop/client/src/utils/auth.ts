import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token; // Returns true if the token exists
  }

  isTokenExpired(token: string) {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds
    return decoded.exp ? decoded.exp < currentTime : true; // Check expiration
  }

  getToken(): string {
    return localStorage.getItem('token') || ''; // Return the token from localStorage
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken); // Set the token to localStorage
    window.location.href = '/home'; // Redirect to the home page
  }

  logout() {
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();
