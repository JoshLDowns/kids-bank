import { useState, useEffect } from "react";
import { useThemeContext } from "../context/theme";
import { useAccountsContext } from "../context/accounts";
import { useInput, useNumberOnlyInput } from "../hooks/useInput";

const FundsModal = ({ type, handleFundsModal }) => {
  const { activeAccount, setActiveAccount } = useAccountsContext();
  const { theme, modalWidth } = useThemeContext();

  const {
    value: input,
    bind: bindInput,
    reset: resetInput,
  } = useNumberOnlyInput("");

  const { value: pass, bind: bindPass, reset: resetPass } = useInput("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(null);
  const password = process.env.REACT_APP_USER_PASS;

  const handleSubmit = (field) => {
    setIsSubmit(true);
    setIsLoading(true);
    fetch(`/api/accounts/${activeAccount._id}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: [`${field}`],
        value:
          type === "deposit"
            ? activeAccount[field] +
              parseFloat(parseFloat(input).toFixed(2)) * 100
            : activeAccount[field] -
              parseFloat(parseFloat(input).toFixed(2)) * 100,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setActiveAccount(data);
        setIsLoading(false);
        setIsAuthorized(false);
        resetPass();
      })
      .catch((error) => {
        setError(error.info);
        setIsLoading(false);
      });
  };

  const handleAuthorize = () => {
    if (pass === password) {
      setError(null);
      setIsAuthorized(true);
    } else {
      setError("Invalid Password!");
    }
  };

  useEffect(() => {
    if (isSubmit && !isLoading && !error) {
      setIsSubmit(false);
      resetInput();
      handleFundsModal();
    }
  }, [isSubmit, isLoading, error, setIsSubmit, resetInput, handleFundsModal]);

  return (
    <div className={`modal-container ${theme}`} style={{ width: modalWidth }}>
      <div className="inner-modal">
        <div className="top-right-absolute">
          <img
            src={`/images/add-${theme === "dark" ? "light" : "dark"}.png`}
            alt="back"
            className="option"
            onClick={() => {
              resetInput();
              setIsAuthorized(false);
              resetPass();
              setError(null);
              handleFundsModal();
            }}
            style={{ transform: "rotate(45deg)" }}
          />
        </div>
        {isLoading && (
          <>
            <h1 className="title-text large">... Loading!</h1>
          </>
        )}
        {!isAuthorized && !isLoading && (
          <>
            <h3 className="body-text large">Please Enter Your Password:</h3>
            <br />
            <form
              onSubmit={(evt) => {
                evt.preventDefault();
                handleAuthorize();
              }}
            >
              <input
                className={`input-${theme} large`}
                {...bindPass}
                type="password"
              />
            </form>
            <br />
            <div className="flex-row center">
              <button
                className={`button-${theme} large`}
                onClick={() => handleAuthorize()}
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
        {!isLoading && isAuthorized && (
          <>
            <h3 className="body-text large">
              {type === "deposit"
                ? "How much would you like to deposit?"
                : "How much would you like to withdraw?"}
            </h3>
            <br />
            <input className={`input-${theme} large`} {...bindInput} />
            <div className="flex-row center">
              <button
                className={`button-${theme} large`}
                onClick={() => handleSubmit("spend")}
              >
                AVAILABLE
              </button>
              <button
                className={`button-${theme} large`}
                onClick={() => handleSubmit("savings")}
              >
                SAVINGS
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

export default FundsModal;
