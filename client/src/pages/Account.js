import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAccountsContext } from "../context/accounts";
import { useThemeContext } from "../context/theme";
import { useAuthContext } from "../context/auth";
import { Link } from "@reach/router";
import { formatMoney } from "../helpers/formatMoney";

import FundsModal from "../components/FundsModal";
import SettingsModal from "../components/SettingsModal";
import Wishlist from "../components/Wishlist";
import Loading from "../components/Loading";

const Account = ({ id }) => {
  const { activeAccount } = useAccountsContext();
  const { setPage, theme, setModalWidth, isSettingsOpen, setSettingsOpen } =
    useThemeContext();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();

  const { isLoading } = useFetch(`/api/accounts/${id}`, "activeAccount");

  const [isFundsModalOpen, setFundsModalOpen] = useState(false);
  const [fundsType, setFundsType] = useState(null);

  const handleFundModal = (type) => {
    setModalWidth(isFundsModalOpen ? "0vw" : "100vw");
    setFundsType(type ? type : null);
    setFundsModalOpen(!isFundsModalOpen);
  };

  const handleSettingsModal = () => {
    setModalWidth(isSettingsOpen ? "0vw" : "100vw");
    setSettingsOpen(!isSettingsOpen);
  };

  useEffect(() => {
    setPage("account");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container" name="active-account">
      {isFundsModalOpen && (
        <FundsModal type={fundsType} handleFundsModal={handleFundModal} />
      )}
      {isSettingsOpen && (
        <SettingsModal handleSettingsModal={handleSettingsModal} />
      )}
      {(isLoading || isAuthLoading) && <Loading />}
      {!isLoading && !isAuthLoading && !activeAccount && (
        <>
          <h1 className="title-text large">Account not found ...</h1>
          <br />
          <h3 className="title-text med">
            <Link to="/">Back to Accounts</Link>
          </h3>
        </>
      )}
      {!isLoading && !isAuthLoading && activeAccount && (
        <>
          <div className="flex-row around">
            <div className="account-card" name="account-wrapper">
              <h3 className="title-text med">{`${activeAccount.username}'s Account`}</h3>
              <br />
              <img
                src={activeAccount.avatarUrl}
                alt={`${activeAccount.username} - avatar`}
                className="avatar no-events"
              />
            </div>
            <div class-name="account-info">
              <h3 className="body-text large">
                {`Available: ${formatMoney(activeAccount.spend)}`}
              </h3>
              <br />
              <h3 className="body-text large">
                {`Savings: ${formatMoney(activeAccount.savings)}`}
              </h3>
            </div>
          </div>
          {isAuthenticated && (
            <>
              <br />
              <br />
              <br />
              <br />
              <div className="flex-row center">
                <button
                  className={`button-${theme} large`}
                  onClick={() => handleFundModal("deposit")}
                >
                  DEPOSIT
                </button>
                <button
                  className={`button-${theme} large`}
                  onClick={() => handleFundModal("withdraw")}
                >
                  WITHDRAW
                </button>
              </div>
            </>
          )}
          <br />
          <br />
          <Wishlist />
        </>
      )}
    </div>
  );
};

export default Account;
