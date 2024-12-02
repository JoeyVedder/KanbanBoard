import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";

const API_URL = 'http://localhost:5432/';

// Define the return type to include the token
interface LoginResponse {
  token: string;
}

const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}`, userInfo);

    const { token } = response.data;

    localStorage.setItem('jwtToken', token);

    window.location.href = '/'; // Redirect after login

    return response.data; // Return the response data to be used later
  } catch (error) {
    // Check if the error is an AxiosError to access `response`
    if (axios.isAxiosError(error)) {
      console.error('Login error:', error.response?.data || 'Unknown error occurred');
      throw new Error(error.response?.data?.message || 'Invalid username or password');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export { login };