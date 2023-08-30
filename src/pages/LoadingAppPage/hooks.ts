import { useEffect } from "react";
import size from "lodash/size";
import find from "lodash/find";
import uniq from "lodash/uniq";
import filter from "lodash/filter";
import concat from "lodash/concat";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  // useQueryWithClient,
  // useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { QueryKey } from "../../query";
import { getEmployeesService } from "../../services/peoplehr";
import type { UserContext } from "../../types";
//..
import { useQuery as useQueryWithClient } from "@tanstack/react-query";
import { useDeskproLatestAppContext as mockUseDeskproLatestAppContext } from "../../../testing/hooks";

type UseCheckIsAuth = () => void;

const useCheckIsAuth: UseCheckIsAuth = () => {
  const navigate = useNavigate();
  // const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { context } = mockUseDeskproLatestAppContext();

  const employeeEmails = uniq(filter(concat(
    get(context, ["data", "user", "primaryEmail"]),
    get(context, ["data", "user", "emails"]),
  ), Boolean));

  const fetchedEmployees = useQueryWithClient(
    [QueryKey.EMPLOYEES],
    getEmployeesService,
  );

  useEffect(() => {
    const employees = get(fetchedEmployees, ["data", "Result"], []);

    if (size(employees) && size(employeeEmails)) {
      const employee = find(employees, (e) => {
        return employeeEmails.includes(get(e, ["EmailId", "DisplayValue"]));
      });

      const employeeId = get(employee, ["EmployeeId", "DisplayValue"]);

      navigate(employeeId ? `/employee/${employeeId}` : "/not-found");
    }
  }, [navigate, fetchedEmployees, employeeEmails]);
};

export { useCheckIsAuth };
