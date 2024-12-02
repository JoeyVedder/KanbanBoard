import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthenticationService {
  getUserProfile() {
    // TODO: return the decoded token
    const token = this.retrieveToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  isLoggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return !!this.retrieveToken() && !this.hasTokenExpired(this.retrieveToken());
  }

  hasTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.exp ? decoded.exp < Date.now() / 1000 : true;
  }

  retrieveToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';
  }

  signIn(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  signOut() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthenticationService();
