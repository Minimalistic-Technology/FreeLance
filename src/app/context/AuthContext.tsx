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
  isAdmin?: boolean; // Added to identify admin users
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
   The generic <AuthContextType | undefined> tells TypeScript that this context can either have a value (of type AuthContextType) or be undefined (before being wrapped in a provider).
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
interface String {
  /* 
     children means this provider will wrap other components and pass context values down to them.
      Type ReactNode covers anything React can render.
  */
  children: ReactNode;
}
 
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    // No redirection here; let the calling component handle navigation based on isAdmin
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  /*
       Object holding the context values:

      Bundles the states (isAuthenticated, user) and functions (login, logout) into a single object.

      This is what components consuming the context will access
  
  */
  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};












/*  Why  useAuth hook is used !! 

Think of useAuth as a remote control for your authentication system.

The TV is your AuthContext (it has all the state and functions inside).

Without a remote, you’d need to walk up to the TV every time and press buttons manually (useContext(AuthContext) everywhere).

With a remote (useAuth), you can just sit anywhere and press a button — you instantly access the TV’s functions without extra setup.

*/




/* Why the useAuth is not called AuthProvider 
       
So the reason useAuth isn’t called inside AuthProvider is because AuthProvider is the one providing the data. Other components call useAuth to consume the data.

*/



/* Provide flow of how the whole code  runs from child to parent(AuthContext) file. 
  


useAuth() calls useContext(AuthContext).

React goes up the component tree, looking for the nearest <AuthContext.Provider>.

In your app, that’s provided by <AuthProvider>, which wraps children:

return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);


The value you gave ({ isAuthenticated, user, login, logout }) is returned.

useAuth() gives that to LoginPage.
*/