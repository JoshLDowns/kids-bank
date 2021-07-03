import { useState, useEffect } from "react";
import { useThemeContext } from "../context/theme";
import { useAccountsContext } from "../context/accounts";

const SettingsModal = ({ handleSettingsModal }) => {
  const {activeAccount, setActiveAccount} = useAccountsContext();
  const {theme, modalWidth } = useThemeContext();

  const urls = [
    {name: "avatar-unicorn", url: "https://res.cloudinary.com/joshdowns-dev/image/upload/v1625311832/kids_bank/avatar-unicorn_cgrf2o.png"},
    {name: "avatar-unicup", url: "https://res.cloudinary.com/joshdowns-dev/image/upload/v1625311832/kids_bank/avatar-unicup_kikxmk.png"},
    {name: "avatar-dragon", url: "https://res.cloudinary.com/joshdowns-dev/image/upload/v1625311832/kids_bank/avatar-dragon_je3jco.png"},
    {name: "avatar-rainbow", url: "https://res.cloudinary.com/joshdowns-dev/image/upload/v1625311831/kids_bank/avatar-rainbow_yyohjn.png"},
    {name: "avatar-astronaut", url: "https://res.cloudinary.com/joshdowns-dev/image/upload/v1625311831/kids_bank/avatar-astronaut_er05vy.png"},
    {name: "avatar-rocket", url: "https://res.cloudinary.com/joshdowns-dev/image/upload/v1625311832/kids_bank/avatar-rocket_tjhhel.png"},
    {name: "avatar-donut", url: "https://res.cloudinary.com/joshdowns-dev/image/upload/v1625311831/kids_bank/avatar-donut_nwy5ey.png"},
  ]

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (url) => {
    setIsSubmit(true);
    setIsLoading(true);
    fetch(`/api/accounts/${activeAccount._id}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: "avatarUrl",
        value: url
      })
    })
    .then((res) => res.json())
      .then((data) => {
        setActiveAccount(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.info);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (isSubmit && !isLoading && !error) {
      setIsSubmit(false);
      handleSettingsModal();
    }
  }, [isSubmit, isLoading, error, setIsSubmit, handleSettingsModal]);

  return (
    <div className={`modal-container ${theme}`} style={{ width: modalWidth }}>
      <div className="inner-modal">
        <div className="top-right-absolute">
          <img
            src={`/images/add-${theme === "dark" ? "light" : "dark"}.png`}
            alt="back"
            className="option"
            onClick={() => {
              setError(null);
              handleSettingsModal();
            }}
            style={{ transform: "rotate(45deg)" }}
          />
        </div>
        {isLoading && (
          <>
            <h1 className="title-text large">... Loading!</h1>
          </>
        )}
        {!isLoading && (
          <>
            <h3 className="body-text large">Select your Avatar:</h3>
            <br />
            <div className="flex-row center">
            {urls.map((url, i) => (
              <div className="account-card" key={i} name="account-wrapper">
                <img
                  src={url.url}
                  alt={`${url.name} - avatar`}
                  className="avatar"
                  onClick={() => handleSubmit(url.url)}
                />
                <br />
                <br />
              </div>
            ))}
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
  )
}

export default SettingsModal;
