import { memo, useState } from "react";
import { useInput, useNumberOnlyInput } from "../hooks/useInput";
import { useAccountsContext } from "../context/accounts";
import { useThemeContext } from "../context/theme";
import { formatMoney } from "../helpers/formatMoney";

const Wishlist = () => {
  const { activeAccount, setActiveAccount } = useAccountsContext();
  const { theme } = useThemeContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { value: item, bind: bindItem, reset: resetItem } = useInput("");
  const {
    value: cost,
    bind: bindCost,
    reset: resetCost,
  } = useNumberOnlyInput("");

  const handleAdd = () => {
    let list = [
      ...activeAccount.wishlist,
      { item: item, cost: parseFloat(parseFloat(cost).toFixed(2)) * 100 },
    ];
    handleFetch({ field: "wishlist", value: list });
  };

  const handleBuy = (item) => {
    let cost = activeAccount.wishlist.find((wish) => wish.item === item).cost;
    handleFetch({ field: "spend", value: activeAccount.spend - cost });
    handleRemove(item);
  };

  const handleRemove = (item) => {
    let list = activeAccount.wishlist.filter((wish) => wish.item !== item);
    handleFetch({ field: "wishlist", value: list });
  };

  const handleFetch = (body) => {
    setIsLoading(true);
    fetch(`/api/accounts/${activeAccount._id}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setActiveAccount(data);
        setIsLoading(false);
        resetItem();
        resetCost();
      })
      .catch((error) => {
        setError(error.info);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="flex-row center">
        <h3 className="title-text large">Wish List:</h3>
      </div>
      <br />
      {activeAccount.wishlist.length > 0 &&
        activeAccount.wishlist.map((wish, i) => (
          <div
            style={{ marginBottom: 20 }}
            className={`flex-row between rounded-border`}
            key={i}
          >
            <h3 className="body-text large">
              {`${wish.item}: ${formatMoney(wish.cost)}`}
            </h3>
            <h3 className="body-text large">
              {wish.cost - activeAccount.spend > 0
                ? `Need to Earn: ${formatMoney(
                    wish.cost - activeAccount.spend
                  )}`
                : "Earned!"}
            </h3>
            {wish.cost - activeAccount.spend > 0 ? (
              <img
                src={`/images/add-${theme === "dark" ? "light" : "dark"}.png`}
                alt="back"
                className="option"
                onClick={() => {
                  handleRemove(wish.item);
                }}
                style={{ transform: "rotate(45deg)" }}
              />
            ) : (
              <h3
                className="body-text large hover-text"
                onClick={() => handleBuy(wish.item)}
              >
                BUY!
              </h3>
            )}
          </div>
        ))}
      <br />
      <br />
      <div className="flex-row between">
        <input
          style={{ margin: 0 }}
          className={`input-${theme} half-width med`}
          {...bindItem}
          placeholder="Item"
        />
        <input
          style={{ margin: 0 }}
          className={`input-${theme} quarter-width med`}
          {...bindCost}
          placeholder="Cost"
        />
        <img
          src={`/images/add-${theme === "dark" ? "light" : "dark"}.png`}
          alt="add account"
          className="option"
          onClick={handleAdd}
        />
      </div>
      {isLoading && (
        <>
          <br />
          <div className="flex-row center">
            <div className="lds-heart">
              <div></div>
            </div>
          </div>
        </>
      )}
      {error && (
        <>
          <br />
          <h3 className="body-text med">{error}</h3>
        </>
      )}
    </>
  );
};

export default memo(Wishlist);
