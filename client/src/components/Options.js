import { useThemeContext } from "../context/theme";
import { navigate } from "@reach/router";

const Options = () => {
  const { page, theme, setModalWidth, isNewOpen, setNewOpen } =
    useThemeContext();

  const handleNewModal = () => {
    setModalWidth(isNewOpen ? "0vw" : "100vw");
    setNewOpen(!isNewOpen);
  };

  return (
    <>
      <div className="top-right-absolute">
        {page === "dashboard" && (
          <img
            src={`/images/add-${theme === "dark" ? "light" : "dark"}.png`}
            alt="add account"
            className="option"
            onClick={handleNewModal}
          />
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
            />
          </>
        )}
      </div>
    </>
  );
};

export default Options;
