"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  grade: string;
  gender: string;
  dormitory: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email?: string, password?: string) => void; // Made params optional for mock
  signup: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email?: string, password?: string) => {
    // Mock login: In a real app, validate credentials
    console.log('Mock login with:', email, password); // email and password not used in mock
    const mockUser: User = {
      email: email || 'test@example.com',
      grade: '10',
      gender: 'Female',
      dormitory: 'Level 3'
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signup = (userData: User) => {
    // Mock signup: In a real app, save user to DB
    console.log('Mock signup with:', userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
