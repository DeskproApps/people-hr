import { useState, useEffect } from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import find from "lodash/find";
import size from "lodash/size";
import filter from "lodash/filter";
import concat from "lodash/concat";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import {
  getEmployeesService,
  getEmployeeSalaryService,
} from "../../services/peoplehr";
import { QueryKey } from "../../query";
import type {
  Maybe,
  EmployeeType,
  TicketContext,
} from "../../types";
import type { Employee, EmployeeSalary } from "../../services/peoplehr/types";

type UseEmployee = () => {
  employee: Maybe<EmployeeType>,
  salary: Maybe<EmployeeSalary>,
  isLoading: boolean;
};

const useEmployee: UseEmployee = () => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const employeeEmails = uniq(filter(concat(
    get(context, ["data", "user", "primaryEmail"]),
    get(context, ["data", "user", "emails"]),
  ), Boolean));
  const [employee, setEmployee] = useState<Maybe<EmployeeType>>(null);

  const employees = useQueryWithClient(
    [QueryKey.EMPLOYEES],
    getEmployeesService,
    {
      select: (data) => (get(data, ["Result"], []) || []).map((employee: Employee) => ({
        id: get(employee, ["EmployeeId", "DisplayValue"], "-") || "-",
        email: get(employee, ["EmailId", "DisplayValue"], "-") || "-",
        department: get(employee, ["Department", "DisplayValue"], "-") || "-",
        role: get(employee, ["JobRole", "DisplayValue"], "-") || "-",
        reportsTo: get(employee, ["ReportsTo", "DisplayValue"] || "-") || "-",
        gender: get(employee, ["Gender","DisplayValue"], "-") || "-",
      })),
    }
  );

  useEffect(() => {
    if (size(employeeEmails)) {
      setEmployee(find(employees.data || [], ({ email }) => employeeEmails.includes(email)));
    }
  }, [employees.data, employeeEmails]);

  const salary = useQueryWithClient(
    [QueryKey.EMPLOYEE_SALARY, get(employee, ["id"]) as string],
    (client) => getEmployeeSalaryService(client, get(employee, ["id"]) as string),
    { enabled: Boolean(get(employee, ["id"])) }
  );

  return {
    isLoading: [employees, salary].some(({ isFetching }) => isFetching),
    employee,
    salary: get(salary, ["data", "Result", 0]),
  };
}

export { useEmployee };
