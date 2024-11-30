import { UserLogin } from "../interfaces/UserLogin";
import axios from "axios";

const authenticateUser = async (credentials: UserLogin) => {
  // TODO: Make a POST request to the login route
  try {
    const serverResponse = await axios.post('/api/login', credentials, {
      headers: { 'Content-Type': 'application/json' },
    });

    return serverResponse.data;
  } catch (err: any) {
    // Checking if the error has a response from the server
    if (err.response) {
      const errorMessage =
        err.response.data.message || 'Login failed. Please try again later.';
      console.error('Server error:', errorMessage);
      throw new Error(errorMessage);
    } else {
      // Handling cases where there is no response (network or unexpected errors)
      console.error(
        'Network or unknown error:',
        err.message || 'An error occurred. Please check your connection.'
      );
      throw new Error('Unable to reach the server.');
    }
  }
};

export { authenticateUser };
