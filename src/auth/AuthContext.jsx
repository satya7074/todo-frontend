import { createContext, useContext, useState } from "react";

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Load from localStorage if exists
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  // Update auth + localStorage
  const login = (data) => {
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  // Clear auth + localStorage
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
