
import axios from "../services/axios";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";

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
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);



interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

     // Check if token is valid on initial load
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          // Check if token has expired
          const decodedToken = jwtDecode<{ exp: number; userId: string }>(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Token expired
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          } else {
            // Token valid, set user from token
            setUser({ userId: decodedToken.userId });
          }
        } catch (error) {
          // Invalid token
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
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
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong during login');
      console.error('Login error:', error);
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
        const decodedToken = jwtDecode<{ userId: string }>(response.data.token);
        setUser({ userId: decodedToken.userId });
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
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };


  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading, 
      error, 
      login, 
      register, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};