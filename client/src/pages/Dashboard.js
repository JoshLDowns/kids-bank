import { useFetch } from "../hooks/useFetch";
import { useAccountsContext } from "../context/accounts";
import { useThemeContext } from "../context/theme";
import { navigate } from "@reach/router";

const Dashboard = () => {
  const { accounts } = useAccountsContext();
  const { setTheme, theme } = useThemeContext();

  const { isLoading } = useFetch("/api/accounts", "accounts");

  const handleClick = (id) => {
    navigate(`/account/${id}`)
  }

  return (
    <div className="container" name="dashboard">
      <div className="top-left-absolute">
        <h1 className="body-text med" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </h1>
      </div>
      <div className="top-right-absolute">
        <h1 className="body-text med">
          Add Account
        </h1>
      </div>
      {isLoading && (
        <>
          <h1 className="title-text large">... Loading!</h1>
        </>
      )}
      {!isLoading && accounts.length === 0 && (
        <>
          <h1 className="title-text large">Welcome to ABC Bank!</h1>
          <br />
          <h3 className="title-text med">
            Click the "Add" icon at the top of your screen to add an account!
          </h3>
        </>
      )}
      {!isLoading && accounts.length > 0 && (
        <>
          <h1 className="title-text large">Welcome to ABC Bank!</h1>
          <br />
          <h3 className="title-text med">Please select an account:</h3>
          <br />
          <br />
          <div className="flex-row center">
            {accounts.map((acct, i) => (
              <div className="account-card" key={i} name="account-wrapper">
                <img
                  src={acct.avatarUrl}
                  alt={`${acct.username} - avatar`}
                  className="avatar"
                  onClick={() => handleClick(acct._id)}
                />
                <br />
                <h3 className="body-text med">{acct.username}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
