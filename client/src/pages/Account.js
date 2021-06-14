import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAccountsContext } from "../context/accounts";
import { useThemeContext } from "../context/theme";
import { Link } from "@reach/router";

import FundsModal from "../components/FundsModal";

const formatMoney = (value) => {
  let moneyAr = (value / 100).toFixed(2).split(".");
  if (moneyAr[0].length > 3) {
    let preDecimalAr = moneyAr[0].split("").reverse();
    let formattedPreDec = preDecimalAr
      .map((num, i) =>
        (i + 1) % 3 === 0 && i + 1 !== preDecimalAr.length ? "," + num : num
      )
      .reverse()
      .join("");
    let returnString = "$" + formattedPreDec + "." + moneyAr[1];
    return returnString;
  } else {
    return "$" + moneyAr[0] + "." + moneyAr[1];
  }
};

const Account = ({ id }) => {
  const { activeAccount } = useAccountsContext();
  const { setPage, theme, setModalWidth } = useThemeContext();

  const { isLoading } = useFetch(`/api/accounts/${id}`, "activeAccount");

  const [isFundsModalOpen, setFundsModalOpen] = useState(false);
  const [fundsType, setFundsType] = useState(null);

  const handleFundModal = (type) => {
    setModalWidth(isFundsModalOpen ? "0vw" : "100vw");
    setFundsType(type ? type : null);
    setFundsModalOpen(!isFundsModalOpen);
  };

  useEffect(() => {
    setPage("account");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container" name="active-account">
      <FundsModal type={fundsType} handleFundsModal={handleFundModal} />
      {isLoading && (
        <>
          <h1 className="title-text large">... Loading!</h1>
        </>
      )}
      {!isLoading && !activeAccount && (
        <>
          <h1 className="title-text large">Account not found ...</h1>
          <br />
          <h3 className="title-text med">
            <Link to="/">Back to Accounts</Link>
          </h3>
        </>
      )}
      {!isLoading && activeAccount && (
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
    </div>
  );
};

export default Account;
