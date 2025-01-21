import round from "lodash/round";
import type { Maybe } from "../types";
import type { Salary } from "../services/peoplehr/types";

const getSalary = (salary?: Maybe<Salary>): string => {
  const currency = salary?.Currency;
  const salaryAmount = salary?.TotalSalaryAmount;

  if (!currency || !salaryAmount) {
    return "-";
  }

  return `${currency} ${round(Number(salaryAmount), 2)}`;
};

export { getSalary };
