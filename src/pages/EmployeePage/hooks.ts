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
import type { Maybe, DateType } from "../../types";
import type {
  Late,
  Salary,
  Holiday,
  Benefit,
  Document,
  Employee,
  Training,
  Qualification,
} from "../../services/peoplehr/types";

type EmployeesOptions = {
  employeeId?: Employee["EmployeeId"]["DisplayValue"],
  holidaysPeriodMax: DateType,
};

type UseEmployee = (options: EmployeesOptions) => {
  employee: Maybe<Employee>,
  salary: Maybe<Salary>,
  holidays: Maybe<Holiday[]>,
  benefits: Maybe<Benefit[]>,
  documents: Maybe<Document[]>,
  lateness: Maybe<Late[]>,
  trainings: Maybe<Training[]>,
  qualifications: Maybe<Qualification[]>,
  isLoading: boolean;
};

const useEmployee: UseEmployee = ({ employeeId, holidaysPeriodMax }) => {
  const employee = useQueryWithClient(
    [QueryKey.EMPLOYEE, employeeId as Employee["EmployeeId"]["DisplayValue"]],
    (client) => getEmployeeService(client, employeeId as Employee["EmployeeId"]["DisplayValue"]),
    { enabled: Boolean(employeeId) },
  );

  const salary = useQueryWithClient(
    [QueryKey.EMPLOYEE_SALARY, employeeId as Employee["EmployeeId"]["DisplayValue"]],
    (client) => getEmployeeSalaryService(client, employeeId as Employee["EmployeeId"]["DisplayValue"]),
    {
      enabled: Boolean(employeeId),
      useErrorBoundary: false,
    },
  );

  const holidays = useQueryWithClient(
    [QueryKey.EMPLOYEE_HOLIDAY, employeeId as Employee["EmployeeId"]["DisplayValue"], holidaysPeriodMax],
    (client) => getEmployeeHolidayService(client, {
      employeeId: employeeId as Employee["EmployeeId"]["DisplayValue"],
      start: format(new Date(), API_FORMAT),
      end: holidaysPeriodMax,
    }),
    {
      enabled: Boolean(employeeId),
      useErrorBoundary: false,
    }
  );

  const benefits = useQueryWithClient(
    [QueryKey.EMPLOYEE_BENEFITS, employeeId as Employee["EmployeeId"]["DisplayValue"]],
    (client) => getEmployeeBenefitService(client, employeeId as Employee["EmployeeId"]["DisplayValue"]),
    {
      enabled: Boolean(employeeId),
      useErrorBoundary: false,
    },
  );

  const documents = useQueryWithClient(
    [QueryKey.EMPLOYEE_DOCUMENTS, employeeId as Employee["EmployeeId"]["DisplayValue"]],
    (client) => getEmployeeDocumentsService(client, employeeId as Employee["EmployeeId"]["DisplayValue"]),
    {
      enabled: Boolean(employeeId),
      useErrorBoundary: false,
    },
  );

  const lateness = useQueryWithClient(
    [QueryKey.EMPLOYEE_LATE, employeeId as Employee["EmployeeId"]["DisplayValue"]],
    (client) => getEmployeeLateService(client, {
      employeeId: employeeId as Employee["EmployeeId"]["DisplayValue"],
      start: format(subMonths(new Date(), 2), API_FORMAT),
      end: format(new Date(), API_FORMAT),
    }),
    {
      enabled: Boolean(employeeId),
      useErrorBoundary: false,
    },
  );

  const qualifications = useQueryWithClient(
    [QueryKey.EMPLOYEE_QUALIFICATIONS, employeeId as Employee["EmployeeId"]["DisplayValue"]],
    (client) => getEmployeeQualificationsService(client, employeeId as Employee["EmployeeId"]["DisplayValue"]),
    {
      enabled: Boolean(employeeId),
      useErrorBoundary: false,
    },
  );

  const trainings = useQueryWithClient(
    [QueryKey.EMPLOYEE_TRAININGS, employeeId as Employee["EmployeeId"]["DisplayValue"]],
    (client) => getEmployeeTrainingsService(client, employeeId as Employee["EmployeeId"]["DisplayValue"]),
    {
      enabled: Boolean(employeeId),
      useErrorBoundary: false,
    },
  );

  return {
    isLoading: [
      salary,
      holidays,
      benefits,
      lateness,
      documents,
    ].some(({ isFetching }) => isFetching),
    employee: get(employee, ["data", "Result"]),
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
