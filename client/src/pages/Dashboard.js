import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAccountsContext } from "../context/accounts";
import { useThemeContext } from "../context/theme";
import { useAuthContext } from "../context/auth";
import { navigate } from "@reach/router";

import NewModal from "../components/NewModal";
import LoginModal from "../components/LoginModal";
import Loading from "../components/Loading";

const Dashboard = () => {
  const { accounts } = useAccountsContext();
  const {
    setPage,
    setModalWidth,
    isNewOpen,
    setNewOpen,
    isLoginOpen,
    setLoginOpen,
    theme,
  } = useThemeContext();
  const {
    isLoading: isAuthLoading,
    bearer,
    isAuthenticated,
  } = useAuthContext();

  const { isLoading } = useFetch("/api/accounts", "accounts");

  const [isUpdateAllowanceLoading, setUpdateAllowanceLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNewModal = () => {
    setModalWidth(isNewOpen ? "0vw" : "100vw");
    setNewOpen(!isNewOpen);
  };

  const handleAuthModal = () => {
    setModalWidth(isLoginOpen ? "0vw" : "100vw");
    setLoginOpen(!isLoginOpen);
  };

  const handleClick = (id) => {
    navigate(`/account/${id}`);
  };

  const handleAddAllowance = async () => {
    console.log("adding allowance!");
    setUpdateAllowanceLoading(true);
    try {
      for (let i = 0; i < accounts.length; i++) {
        const spendResp = await fetch(`/api/accounts/${accounts[i]._id}/update`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${bearer}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            field: ["spend"],
            value: 500 + accounts[i].spend
          }),
        });
        const spendRespJson = await spendResp.json();
        if (spendRespJson.errors) {
          throw spendRespJson.info;
        }
        const savingsResp = await fetch(
          `/api/accounts/${accounts[i]._id}/update`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${bearer}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              field: ["savings"],
              value: 500 + accounts[i].savings,
            }),
          }
        );
        const savingsRespJson = await savingsResp.json();
        if (savingsRespJson.errors) {
          throw savingsRespJson.info;
        }
      }
      setError(null);
    } catch (err) {
      setError(err);
    }
    setUpdateAllowanceLoading(false);
  };

  useEffect(() => {
    setPage("dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container center-text" name="dashboard">
      <NewModal handleNewModal={handleNewModal} />
      <LoginModal handleLoginModal={handleAuthModal} />
      {(isLoading || isAuthLoading || isUpdateAllowanceLoading) && <Loading />}
      {!isLoading && !isAuthLoading && accounts.length === 0 && (
        <>
          <h1 className="title-text large">Welcome to ABC Bank!</h1>
          <br />
          <h3 className="title-text med">
            Click the "Add" icon at the top of your screen to add an account!
          </h3>
        </>
      )}
      {!isLoading && !isAuthLoading && accounts.length > 0 && (
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
          {isAuthenticated && (
            <>
              <br />
              <button
                className={`button-${theme} large`}
                onClick={handleAddAllowance}
              >
                ADD ALLOWANCE
              </button>
              {error && (
                <>
                  <br />
                  <h3 className="body-text med">{error}</h3>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
