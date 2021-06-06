import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeWrapper = ({ children }) => {
  const [theme, setTheme] = useState("light");

  let themeState = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
