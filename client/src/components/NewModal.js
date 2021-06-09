import { useState, useEffect } from "react";
import { useThemeContext } from "../context/theme";
import { useAccountsContext } from "../context/accounts";
import { useInput, useNumberOnlyInput } from "../hooks/useInput";

const NewModal = ({ handleNewModal }) => {
  const { activeAccounts, setActiveAccounts } = useAccountsContext();
  const { theme, modalWidth } = useThemeContext();

  const { value: name, bind: bindName, reset: resetName } = useInput("");

  const {
    value: initialSpend,
    bind: bindInitialSpend,
    reset: resetInitialSpend,
  } = useNumberOnlyInput("");

  const {
    value: initialSavings,
    bind: bindInitialSavings,
    reset: resetInitialSavings,
  } = useNumberOnlyInput("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setIsSubmit(true);
    setIsLoading(true);
    fetch(`/api/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        spend: parseFloat(parseFloat(initialSpend).toFixed(2)) * 100,
        savings: parseFloat(parseFloat(initialSavings).toFixed(2)) * 100,
        avatarUrl: avatarUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setActiveAccounts([...activeAccounts, data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.info);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isSubmit && !isLoading && !error) {
      setIsSubmit(false);
      resetName();
      resetInitialSavings();
      resetInitialSpend();
      setAvatarUrl("");
      handleNewModal();
    }
  }, [
    isSubmit,
    isLoading,
    error,
    setIsSubmit,
    resetName,
    resetInitialSpend,
    resetInitialSavings,
    handleNewModal,
  ]);

  return (
    <div className={`modal-container ${theme}`} style={{ width: modalWidth }}>
      <div className="inner-modal">
        <div className="top-right-absolute">
          <img
            src={`/images/add-${theme === "dark" ? "light" : "dark"}.png`}
            alt="back"
            className="option"
            onClick={() => {
              resetName();
              resetInitialSavings();
              resetInitialSpend();
              setAvatarUrl("");
              handleNewModal();
            }}
            style={{ transform: "rotate(45deg)" }}
          />
        </div>
        {isLoading && (
          <>
            <h1 className="title-text large">... Loading!</h1>
          </>
        )}
        {!error && !isLoading && (
          <>
            <h3 className="body-text large">
              Add New Account
            </h3>
            <br />
            <input className={`input-${theme} large`} {...bindName} placeholder="USERNAME" />
            <input className={`input-${theme} large`} {...bindInitialSpend} placeholder="AVAILABLE $" />
            <input className={`input-${theme} large`} {...bindInitialSavings} placeholder="SAVINGS $" />
            
            <div className="flex-row center">
              <button
                className={`button-${theme} large`}
                onClick={() => handleSubmit()}
              >
                SUBMIT
              </button>
            </div>
          </>
        )}
        {!isLoading && error && (
          <>
            <h1 className="title-text large">
              It looks like something went wrong ...
            </h1>
            <br />
            <h3 className="body-text large">{`Error: ${error}`}</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default NewModal;
