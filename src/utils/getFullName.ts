import get from "lodash/get";
import size from "lodash/size";
import type { Maybe } from "../types";
import type { Employee } from "../services/peoplehr/types";

const getFullName = (employee: Maybe<Employee>): string => {
  const firstName = get(employee, ["FirstName", "DisplayValue"]);
  const lastName = get(employee, ["LastName", "DisplayValue"]);

  const fullName: string[] = [];

  if (firstName) {
    fullName.push(firstName);
  }

  if (lastName) {
    fullName.push(lastName);
  }

  return !size(fullName) ? "-" : fullName.join(" ");
};

export { getFullName };
