import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser } from '@/types/models';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'heir' | 'investor';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage (will be replaced with MongoDB API calls)
const MOCK_USERS_KEY = 'merath_users';
const MOCK_SESSION_KEY = 'merath_session';

const generateObjectId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomPart = Math.random().toString(16).substring(2, 18);
  return timestamp + randomPart.padEnd(16, '0').substring(0, 16);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionData = localStorage.getItem(MOCK_SESSION_KEY);
        if (sessionData) {
          const session = JSON.parse(sessionData);
          if (new Date(session.expiresAt) > new Date()) {
            const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
            const foundUser = users.find((u: AuthUser) => u._id === session.userId);
            if (foundUser) {
              setUser(foundUser);
            }
          } else {
            localStorage.removeItem(MOCK_SESSION_KEY);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const users: AuthUser[] = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        return { success: false, error: 'User not found' };
      }
      
      // In real implementation, password would be verified on backend
      // For mock, we'll accept any password for existing users
      
      // Create session
      const session = {
        _id: generateObjectId(),
        userId: foundUser._id,
        token: generateObjectId() + generateObjectId(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session));
      setUser(foundUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const users: AuthUser[] = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
      
      // Check if email already exists
      if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
        return { success: false, error: 'Email already registered' };
      }
      
      const now = new Date().toISOString();
      const newUser: AuthUser = {
        _id: generateObjectId(),
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role,
        isVerified: false,
        createdAt: now,
        updatedAt: now
      };
      
      users.push(newUser);
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
      
      // Auto-login after signup
      const session = {
        _id: generateObjectId(),
        userId: newUser._id,
        token: generateObjectId() + generateObjectId(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: now
      };
      
      localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session));
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem(MOCK_SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
