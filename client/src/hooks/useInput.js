import { useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

export const useNumberOnlyInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        let newValue = event.target.value
          .split("")
          .filter((char) => numArray.includes(char))
          .join("");
        if (newValue === "") {
          setValue("");
        } else {
          setValue(newValue.toFixed(2));
        }
      },
    },
  };
};