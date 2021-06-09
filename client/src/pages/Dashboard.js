import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAccountsContext } from "../context/accounts";
import { useThemeContext } from "../context/theme";
import { navigate } from "@reach/router";

import NewModal from "../components/NewModal";

const Dashboard = () => {
  const { accounts } = useAccountsContext();
  const { setPage, setModalWidth, isNewOpen, setNewOpen } = useThemeContext();

  const { isLoading } = useFetch("/api/accounts", "accounts");

  const handleNewModal = () => {
    setModalWidth(isNewOpen ? "0vw" : "100vw");
    setNewOpen(!isNewOpen);
  };

  const handleClick = (id) => {
    navigate(`/account/${id}`);
  };

  useEffect(() => {
    setPage("dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container center-text" name="dashboard">
      <NewModal handleNewModal={handleNewModal} />
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
