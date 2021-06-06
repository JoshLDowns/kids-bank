import { useFetch } from "../hooks/useFetch";
import { useAccountsContext } from "../context/accounts";

const Dashboard = () => {
  const { accounts } = useAccountsContext();

  const { isLoading } = useFetch("/api/accounts", "accounts");

  return (
    <div className="dashboard" name="dashboard">
      {isLoading && (
        <>
          <h1>... Loading!</h1>
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
          <div className="flex-row">
            {accounts.map((acct, i) => (
              <div className="account" key={i} name="account-wrapper">
                <img
                  src={acct.avatarUrl}
                  alt={`${acct.username} - avatar`}
                  className="avatar"
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
