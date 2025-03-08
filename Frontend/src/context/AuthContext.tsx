
import axios from "../services/axios";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "./ToastContext";

type User = {
  userId: string;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getUserInitials: () => string;
  getUserDetails: () => Promise<void>;
  userDetails: any | null;
  resetPassword: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);



interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const { addToast } = useContext(ToastContext);

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(localStorage.getItem('userAvatar'));
  const [userDetails, setUserDetails] = useState<any | null>(null);

  const navigate = useNavigate();

  // Check if token is valid on initial load
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          // Check if token has expired
          const decodedToken = jwtDecode<{ exp: number; userId: string, userName: string }>(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Token expired
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          } else {
            // Token valid, set user from token
            setUser({ userId: decodedToken.userId });
            localStorage.setItem('userName', decodedToken.userName);
            setUserName(decodedToken.userName);
          }
        } catch (error) {
          // Invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          setToken(null);
          setUser(null);
          setUserName(null);
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/user/login', { email, password });

      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);

        // Decode token to get user info
        const decodedToken = jwtDecode<{ userId: string }>(response.data.token);
        setUser({ userId: decodedToken.userId });
        localStorage.setItem('userName', response.data.userName);
        setUserName(response.data.userName);
        
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      addToast("error", error.response ? error.response.data.message : 'Something went wrong during login. Please contact admin');
      console.log('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/user/register', { name, email, password });

      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);

        // Decode token to get user info
        const decodedToken = jwtDecode<{ userId: string, userName: string }>(response.data.token);
        setUser({ userId: decodedToken.userId });
        localStorage.setItem('userName', decodedToken.userName);
        setUserName(decodedToken.userName);
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong during registration');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const getUserInitials = () => {
    const nameParts = userName?.split(' ');

    // If there's only one part to the name
    if (nameParts?.length === 1) {
      // If the name has at least two characters, return first two letters
      if (nameParts[0].length >= 2) {
        return nameParts[0].substring(0, 2).toUpperCase();
      }
      // If the name has only one character, return that character twice
      else if (nameParts[0].length === 1) {
        return (nameParts[0] + nameParts[0]).toUpperCase();
      }
      // Handle empty string
      return '';
    }
    // If there are multiple parts 
    // Get first letter of first name and first letter of last name
    const firstInitial = nameParts ? nameParts[0].charAt(0) : '';
    const secondInitial = nameParts ? nameParts[nameParts.length - 1].charAt(0) : '';

    return (firstInitial + secondInitial).toUpperCase();
  };

  const getUserDetails = async () => {
    try{
      const response = await axios.get('/api/user/getUser/' + user?.userId);
      if (response.data.success) {
        setUserDetails(response.data.user);
      }
    } catch (error) {
      console.error('Get user details error:', error);
      if (error && error.status === 401) {
        logout();
        navigate('/login');
        
      }
    }
    
  };

  const resetPassword = async(email: string, password: string) => {
    try{

      const response = await axios.post('/api/user/forgotPassword', { email, password });
      if (response.data.success) {
        addToast("success", "Password updated successfully");
      }
    } catch(error: any) {
      addToast("error", error instanceof Error ? error.message : 'Something went wrong while reseting password. Please contact admin');
    }
  }


  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      error,
      login,
      register,
      logout,
      isAuthenticated,
      getUserInitials,
      getUserDetails,
      userDetails,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};