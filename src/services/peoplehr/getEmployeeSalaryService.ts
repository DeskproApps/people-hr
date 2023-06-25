import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Salary } from "./types";
import mockEmployeeSalary from "../../../testing/mocks/mockEmployeeSalary.json";

const getEmployeeSalaryService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return Promise.resolve(mockEmployeeSalary);
  return baseRequest<Salary>(client, {
    url: "/Salary",
    data: {
      Action: "GetSalaryDetail",
      IsIncludeHistory: true,
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeSalaryService };
