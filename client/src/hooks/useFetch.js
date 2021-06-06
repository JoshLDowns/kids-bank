import { useState, useEffect } from "react";
import { useAccountsContext } from "../context/accounts";

export const useFetch = (url, type) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const { setAccounts, setActiveAccount, setError, error } = useAccountsContext();

  const typeMap = {
    accounts: setAccounts,
    activeAccount: setActiveAccount,
  };

  useEffect(() => {
    if (!data && !error) {
      setIsLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          typeMap[type](json);
          setError(null);
          setIsLoading(false);
        })
        .catch((err) => {
          setError({ error: err.errors, info: err.info });
          typeMap[type](type === "accounts" ? [] : null);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  useEffect(() => {
    setData(null);
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
  };
};
