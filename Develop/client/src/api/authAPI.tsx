import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";


const API_URL = 'http://localhost:3000/api/login'; 

interface LoginResponse {
  token: string;
}

const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(API_URL, userInfo);

    const { token } = response.data;

    
    localStorage.setItem('jwtToken', token);

    
    window.location.href = '/'; 

    return response.data;  // Return the response to be used later
  } catch (error) {
    // Handle errors correctly
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Invalid username or password';
      console.error('Login error:', errorMessage);
      throw new Error(errorMessage); // Throwing error with custom message
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export { login };
