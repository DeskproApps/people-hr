import { useState, useEffect } from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import find from "lodash/find";
import size from "lodash/size";
import filter from "lodash/filter";
import concat from "lodash/concat";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { API_FORMAT } from "../../constants";
import {
  getEmployeesService,
  getEmployeeSalaryService,
  getEmployeeHolidayService,
} from "../../services/peoplehr";
import { QueryKey } from "../../query";
import type {
  Maybe,
  EmployeeType,
  TicketContext,
} from "../../types";
import type { Employee, Salary, Holiday } from "../../services/peoplehr/types";

type UseEmployee = () => {
  employee: Maybe<EmployeeType>,
  salary: Maybe<Salary>,
  holidays: Maybe<Holiday[]>,
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      select: (data) => (get(data, ["Result"], []) || []).map((employee: Employee) => ({
        id: get(employee, ["EmployeeId", "DisplayValue"], "-") || "-",
        firstName: get(employee, ["FirstName", "DisplayValue"]),
        lastName: get(employee, ["LastName", "DisplayValue"]),
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

  const holidays = useQueryWithClient(
    [QueryKey.EMPLOYEE_HOLIDAY, get(employee, ["id"]) as string],
    (client) => getEmployeeHolidayService(client, {
      employeeId: get(employee, ["id"]) as string,
      start: format(new Date(), API_FORMAT),
      end: format(addMonths(new Date(), 6), API_FORMAT)
    }),
    { enabled: Boolean(get(employee, ["id"])) }
  );

  return {
    isLoading: [employees, salary, holidays].some(({ isFetching }) => isFetching),
    employee,
    salary: get(salary, ["data", "Result", 0]),
    holidays: get(holidays, ["data", "Result"], []) || [],
  };
}

export { useEmployee };
