import { useEffect } from "react";
import { useThemeContext } from "../context/theme";
import { useAuthContext } from "../context/auth";
import { useInput } from "../hooks/useInput";
import Loading from "./Loading";

const LoginModal = ({ handleLoginModal }) => {
  const { theme, modalWidth, isLoginOpen } = useThemeContext();
  const { login, error, isAuthenticated, isLoading } = useAuthContext();
  const { value: pass, bind: bindPass, reset } = useInput("");

  const handleLogin = () => {
    login(pass);
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading && !error && isLoginOpen) {
      reset();
      handleLoginModal();
    }
  }, [isAuthenticated, isLoading, error, isLoginOpen, reset, handleLoginModal]);

  return (
    <div className={`modal-container ${theme}`} style={{ width: modalWidth }}>
      <div className="inner-modal">
        <div className="top-right-absolute">
          <img
            src={`/images/add-${theme === "dark" ? "light" : "dark"}.png`}
            alt="back"
            className="option"
            onClick={() => {
              reset();
              handleLoginModal();
            }}
            style={{ transform: "rotate(45deg)" }}
          />
        </div>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <h3 className="body-text large">Please Enter Your Password:</h3>
            <br />
            <form
              onSubmit={(evt) => {
                evt.preventDefault();
                handleLogin();
              }}
            >
              <input
                className={`input-${theme} large full-width`}
                {...bindPass}
                type="password"
              />
            </form>
            <br />
            <div className="flex-row center">
              <button
                className={`button-${theme} large`}
                onClick={() => handleLogin()}
              >
                SUBMIT
              </button>
            </div>
            {error && (
              <>
                <br />
                <h3 className="body-text med">{error}</h3>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
