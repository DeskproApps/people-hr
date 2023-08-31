import { useEffect } from "react";
import has from "lodash/has";
import get from "lodash/get";
import size from "lodash/size";
import find from "lodash/find";
import uniq from "lodash/uniq";
import filter from "lodash/filter";
import concat from "lodash/concat";
import { useNavigate } from "react-router-dom";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { getEmployeesService } from "../../services/peoplehr";
import { QueryKey } from "../../query";
import type { Employee } from "../../services/peoplehr/types";
import type { UserContext } from "../../types";

type Result = void;

const useCheckIsExistEmployee = (): Result => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };

  const employeeEmails = uniq(filter(concat(
    get(context, ["data", "user", "primaryEmail"]),
    get(context, ["data", "user", "emails"]),
  ), Boolean));

  const employees = useQueryWithClient([QueryKey.EMPLOYEES], getEmployeesService);

  useEffect(() => {
    if (size(employeeEmails) && employees.isFetched) {
      const employee = find(
        (get(employees, ["data", "Result"], []) || []),
        (e: Employee) => {
          return employeeEmails.includes(get(e, ["EmailId", "DisplayValue"]));
        },
      );

      navigate(has(employee, ["EmployeeId", "DisplayValue"])
        ? `/employee/${get(employee, ["EmployeeId", "DisplayValue"])}`
        : "/no-found"
      );
    }
  }, [employees, navigate, employeeEmails]);
};

export { useCheckIsExistEmployee };
