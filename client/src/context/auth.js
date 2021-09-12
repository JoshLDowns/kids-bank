import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bearer, setBearer] = useState(null);
  const [error, setError] = useState(null);

  const login = async (password) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/authorize/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      });
      const resJson = await response.json();
      console.log(resJson);
      if (resJson.errors) {
        throw resJson.info;
      }
      setIsAuthenticated(true);
      setBearer(resJson.token);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setBearer(null);
  };

  let authState = {
    isLoading,
    isAuthenticated,
    bearer,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
