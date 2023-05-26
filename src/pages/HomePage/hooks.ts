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
  getEmployeeLateService,
  getEmployeeSalaryService,
  getEmployeeHolidayService,
  getEmployeeBenefitService,
  getEmployeeDocumentsService,
  getEmployeeTrainingsService,
  getEmployeeQualificationsService,
} from "../../services/peoplehr";
import { QueryKey } from "../../query";
import type {
  Maybe,
  EmployeeType,
  TicketContext,
} from "../../types";
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

type UseEmployee = () => {
  employee: Maybe<EmployeeType>,
  salary: Maybe<Salary>,
  holidays: Maybe<Holiday[]>,
  benefits: Maybe<Benefit[]>,
  documents: Maybe<Document[]>,
  lateness: Maybe<Late[]>,
  trainings: Maybe<Training[]>,
  qualifications: Maybe<Qualification[]>,
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

  const benefits = useQueryWithClient(
    [QueryKey.EMPLOYEE_BENEFITS, get(employee, ["id"]) as string],
    (client) => getEmployeeBenefitService(client, get(employee, ["id"]) as string),
    { enabled: Boolean(get(employee, ["id"])) },
  );

  const documents = useQueryWithClient(
    [QueryKey.EMPLOYEE_DOCUMENTS, get(employee, ["id"]) as string],
    (client) => getEmployeeDocumentsService(client, get(employee, ["id"]) as string),
    { enabled: Boolean(get(employee, ["id"])) },
  );

  const lateness = useQueryWithClient(
    [QueryKey.EMPLOYEE_LATE, get(employee, ["id"]) as string],
    (client) => getEmployeeLateService(client, {
      employeeId: get(employee, ["id"]) as string,
      start: "2023-01-01",
      end: format(new Date(), API_FORMAT),
    }),
    { enabled: Boolean(get(employee, ["id"])) },
  );

  const qualifications = useQueryWithClient(
    [QueryKey.EMPLOYEE_QUALIFICATIONS, get(employee, ["id"]) as string],
    (client) => getEmployeeQualificationsService(client, get(employee, ["id"]) as string),
    { enabled: Boolean(get(employee, ["id"])) },
  );

  const trainings = useQueryWithClient(
    [QueryKey.EMPLOYEE_TRAININGS, get(employee, ["id"]) as string],
    (client) => getEmployeeTrainingsService(client, get(employee, ["id"]) as string),
    { enabled: Boolean(get(employee, ["id"])) },
  );

  return {
    isLoading: [
      salary,
      holidays,
      benefits,
      lateness,
      employees,
      documents,
    ].some(({ isFetching }) => isFetching),
    employee,
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
