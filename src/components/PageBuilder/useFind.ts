import { useEffect } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import type { Dict } from "../../types";
import type { FindConfig, Operand } from "./types";

export const getStoreValueByCondition = (store: Dict<any>, cond: Operand) => {

};

const useFind = (config?: FindConfig, store?: Dict<any>): void => {
  useEffect(() => {
    if (!config || isEmpty(config) || isEmpty(store)) {
      return;
    }

    const [operandOne, operandTwo] = get(config, ["if"]) || ["", ""];
    const thenTo = get(config, ["then"]);
    const elseTo = get(config, ["else"]);

    const firstValue = (operandOne.type === "array")
      ? get(store, Array.isArray(operandOne.storeKey) ? operandOne.storeKey : [operandOne.storeKey])
      : get(store, [
        ...(Array.isArray(operandOne.storeKey) ? operandOne.storeKey : [operandOne.storeKey]),
        ...(operandOne.storePath || []),
      ]);
    const secondValue = (operandTwo.type === "array")
      ? get(store, Array.isArray(operandTwo.storeKey) ? operandTwo.storeKey : [operandTwo.storeKey])
      : get(store, [
        ...(Array.isArray(operandTwo.storeKey) ? operandTwo.storeKey : [operandTwo.storeKey]),
        ...(operandOne.storePath || []),
      ]);

    console.log(">>> find:cond:", store);

    if (isEmpty(firstValue) || isEmpty(secondValue)) {
      return;
    }

    const condResult = (firstValue.type !== "array")
      ? firstValue === secondValue
      : firstValue.includes((value) => get(value, operandOne.storePath) === secondValue);

    console.log(">>> find:result:", condResult);
  }, [config, store]);
};

export { useFind };
