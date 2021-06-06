import { createContext, useContext, useState } from "react";

const AccountsContext = createContext();

export const AccountsWrapper = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [error, setError] = useState(null);

  let accountState = {
    accounts,
    setAccounts,
    activeAccount,
    setActiveAccount,
    error,
    setError,
  };

  return (
    <AccountsContext.Provider value={accountState}>
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccountsContext = () => {
  return useContext(AccountsContext);
};
