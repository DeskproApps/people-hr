import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";
import type { Dict, Maybe } from "../../types";
import type { FindConfig, Operand } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStoreValueByCondition = (store: Dict<any>, cond: Operand): []|object|undefined => {
  const storeValue = get(store, cond.storeKey);

  if (cond.type === "array" && Array.isArray(storeValue)) {
    return storeValue;
  }

  return (cond.storePath ? get(storeValue, cond.storePath) : storeValue) || undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFind = (config?: FindConfig, store?: Maybe<Dict<any>>): void => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!config || isEmpty(config) || isEmpty(store)) {
      return;
    }

    const [operandOne, operandTwo] = get(config, ["if"]) || ["", ""];
    const thenTo = get(config, ["then"]);
    const elseTo = get(config, ["else"]);

    const firstValue = getStoreValueByCondition(store, operandOne);
    const secondValue = getStoreValueByCondition(store, operandTwo)

    if (isEmpty(firstValue) || isEmpty(secondValue)) {
      return;
    }

    const condResult = (operandOne.type === "array")
      ? (firstValue as []).some((value) => includes(get(value, operandOne.storePath), secondValue))
      : includes(firstValue, secondValue);

    if (condResult) {
      navigate(thenTo);
    } else {
      navigate(elseTo);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, store]);
};

export { useFind };
