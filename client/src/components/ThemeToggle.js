import { useThemeContext } from "../context/theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <>
      <div className="top-left-absolute">
        <img
          src="/images/theme-toggle.png"
          alt="theme-toggle"
          className="toggle"
          style={{ transform: `rotate(${theme === "light" ? "180deg" : "0"}` }}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </div>
      <div className={`top-left-absolute-block ${theme}`} />
    </>
  );
};

export default ThemeToggle;
