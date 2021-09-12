import { useThemeContext } from "../context/theme";
import { useAuthContext } from "../context/auth";
import { navigate } from "@reach/router";

const Options = () => {
  const {
    page,
    theme,
    setModalWidth,
    isNewOpen,
    setNewOpen,
    isSettingsOpen,
    setSettingsOpen,
    isLoginOpen,
    setLoginOpen,
  } = useThemeContext();

  const { isAuthenticated, logout } = useAuthContext();

  const handleNewModal = () => {
    setModalWidth(isNewOpen ? "0vw" : "100vw");
    setNewOpen(!isNewOpen);
  };

  const handleSettingsModal = () => {
    setModalWidth(isSettingsOpen ? "0vw" : "100vw");
    setSettingsOpen(!isSettingsOpen);
  };

  const handleAuthModal = () => {
    setModalWidth(isLoginOpen ? "0vw" : "100vw");
    setLoginOpen(!isLoginOpen);
  };

  return (
    <>
      <div className="top-right-absolute">
        {page === "dashboard" && (
          <>
            {isAuthenticated && (
              <>
                <button
                  className={`button-${theme} med`}
                  onClick={handleNewModal}
                >
                  ADD ACCOUNT
                </button>
                <button className={`button-${theme} med`} onClick={logout}>
                  LOGOUT
                </button>
              </>
            )}
            {!isAuthenticated && (
              <button
                className={`button-${theme} med`}
                onClick={handleAuthModal}
              >
                LOGIN
              </button>
            )}
          </>
        )}
        {page === "account" && (
          <>
            <img
              src={`/images/back-${theme === "dark" ? "light" : "dark"}.png`}
              alt="back"
              className="option opt-margin arrow"
              onClick={() => navigate("/")}
            />
            <img
              src={`/images/settings-${
                theme === "dark" ? "light" : "dark"
              }.png`}
              alt="settings"
              className="option rotate"
              onClick={handleSettingsModal}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Options;
