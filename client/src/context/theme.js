import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeWrapper = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState("dashboard");
  const [modalWidth, setModalWidth] = useState("0vw");
  const [isNewOpen, setNewOpen] = useState(false);

  let themeState = {
    theme,
    setTheme,
    page,
    setPage,
    modalWidth,
    setModalWidth,
    isNewOpen,
    setNewOpen,
  };

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
