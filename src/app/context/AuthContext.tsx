"use client";
/*
   createContext: Creates a context object to share state across components.

   useContext: A hook to access context values in components.

   ReactNode: A TypeScript type for React children (e.g., elements, components).
*/
import React, { createContext, useContext, useState, ReactNode } from "react";

/* 
   Defines a TypeScript interface User to describe the shape of user data.

*/
interface User {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
  accountType?: "client" | "freelancer";
}

// Defines a TypeScript interface AuthContextType for the context’s value.
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

/* 
   Creates a context object AuthContext with an initial value of undefined. The undefined type allows checking if the context is used correctly (within a provider).
*/
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* 
  Purpose: Defines a custom hook useAuth to access the AuthContext:

  useContext(AuthContext) retrieves the context value.

  If context is undefined, it throws an error to enforce usage within an AuthProvider.

  Returns the context value (isAuthenticated, user, login, logout).

*/
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/* 
    Purpose: Defines a TypeScript interface AuthProviderProps for the AuthProvider component’s props:

    children: The child components wrapped by AuthProvider.

*/
interface AuthProviderProps {
  /* 
     Using ReactNode ensures that the children prop can accept any valid React content(div,span,<App />), making the AuthProvider flexible enough to wrap any part of the application, from single elements to complex component trees
  
  */
  children: ReactNode;
}
 
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};