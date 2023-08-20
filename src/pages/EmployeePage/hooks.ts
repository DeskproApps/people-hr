import get from "lodash/get";
import format from "date-fns/format";
import subMonths from "date-fns/subMonths";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { API_FORMAT } from "../../constants";
import {
  getEmployeeService,
  getEmployeeLateService,
  getEmployeeSalaryService,
  getEmployeeHolidayService,
  getEmployeeBenefitService,
  getEmployeeDocumentsService,
  getEmployeeTrainingsService,
  getEmployeeQualificationsService,
} from "../../services/peoplehr";
import { QueryKey } from "../../query";
import type { Maybe, DateType, EmployeeType } from "../../types";
import type {
  Late,
  Salary,
  Holiday,
  Benefit,
  Document,
  Training,
  Qualification,
} from "../../services/peoplehr/types";

type EmployeesOptions = {
  holidaysPeriodMax: DateType,
  employeeId?: EmployeeType["id"],
};

type UseEmployee = (options: EmployeesOptions) => {
  employee: EmployeeType,
  salary: Maybe<Salary>,
  holidays: Maybe<Holiday[]>,
  benefits: Maybe<Benefit[]>,
  documents: Maybe<Document[]>,
  lateness: Maybe<Late[]>,
  trainings: Maybe<Training[]>,
  qualifications: Maybe<Qualification[]>,
  isLoading: boolean;
};

const useEmployee: UseEmployee = ({ holidaysPeriodMax, employeeId }) => {
  const employee = useQueryWithClient(
    [QueryKey.EMPLOYEE, employeeId as EmployeeType["id"]],
    (client) => getEmployeeService(client, employeeId as EmployeeType["id"]),
    {
      enabled: Boolean(employeeId),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      select: (employee) => ({
        id: get(employee, ["Result", "EmployeeId", "DisplayValue"], "-") || "-",
        firstName: get(employee, ["Result", "FirstName", "DisplayValue"]),
        lastName: get(employee, ["Result", "LastName", "DisplayValue"]),
        email: get(employee, ["Result", "EmailId", "DisplayValue"], "-") || "-",
        department: get(employee, ["Result", "Department", "DisplayValue"], "-") || "-",
        role: get(employee, ["Result", "JobRole", "DisplayValue"], "-") || "-",
        reportsTo: get(employee, ["Result", "ReportsTo", "DisplayValue"] || "-") || "-",
        gender: get(employee, ["Result", "Gender","DisplayValue"], "-") || "-",
      }),
    },
  );

  const salary = useQueryWithClient(
    [QueryKey.EMPLOYEE_SALARY, employeeId as EmployeeType["id"]],
    (client) => getEmployeeSalaryService(client, employeeId as EmployeeType["id"]),
    { enabled: Boolean(employeeId) }
  );

  const holidays = useQueryWithClient(
    [QueryKey.EMPLOYEE_HOLIDAY, employeeId as EmployeeType["id"], holidaysPeriodMax],
    (client) => getEmployeeHolidayService(client, {
      employeeId: employeeId as EmployeeType["id"],
      start: format(new Date(), API_FORMAT),
      end: holidaysPeriodMax,
    }),
    { enabled: Boolean(employeeId) }
  );

  const benefits = useQueryWithClient(
    [QueryKey.EMPLOYEE_BENEFITS, employeeId as EmployeeType["id"]],
    (client) => getEmployeeBenefitService(client, employeeId as EmployeeType["id"]),
    { enabled: Boolean(employeeId) },
  );

  const documents = useQueryWithClient(
    [QueryKey.EMPLOYEE_DOCUMENTS, employeeId as EmployeeType["id"]],
    (client) => getEmployeeDocumentsService(client, employeeId as EmployeeType["id"]),
    { enabled: Boolean(employeeId) },
  );

  const lateness = useQueryWithClient(
    [QueryKey.EMPLOYEE_LATE, employeeId as EmployeeType["id"]],
    (client) => getEmployeeLateService(client, {
      employeeId: employeeId as EmployeeType["id"],
      start: format(subMonths(new Date(), 2), API_FORMAT),
      end: format(new Date(), API_FORMAT),
    }),
    { enabled: Boolean(employeeId) },
  );

  const qualifications = useQueryWithClient(
    [QueryKey.EMPLOYEE_QUALIFICATIONS, employeeId as EmployeeType["id"]],
    (client) => getEmployeeQualificationsService(client, employeeId as EmployeeType["id"]),
    { enabled: Boolean(employeeId) },
  );

  const trainings = useQueryWithClient(
    [QueryKey.EMPLOYEE_TRAININGS, employeeId as EmployeeType["id"]],
    (client) => getEmployeeTrainingsService(client, employeeId as EmployeeType["id"]),
    { enabled: Boolean(employeeId) },
  );

  return {
    isLoading: [
      salary,
      holidays,
      benefits,
      lateness,
      employee,
      documents,
    ].some(({ isFetching }) => isFetching),
    employee: get(employee, ["data"]) as EmployeeType,
    salary: get(salary, ["data", "Result", 0]),
    holidays: get(holidays, ["data", "Result"], []) || [],
    benefits: get(benefits, ["data", "Result"], []) || [],
    documents: get(documents, ["data", "Result"], []) || [],
    lateness: get(lateness, ["data", "Result"], []) || [],
    qualifications: get(qualifications, ["data", "Result"], []) || [],
    trainings: get(trainings, ["data", "Result"], []) || [],
  };
}

export { useEmployee };
