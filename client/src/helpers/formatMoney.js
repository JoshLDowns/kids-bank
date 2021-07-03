export const formatMoney = (value) => {
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
