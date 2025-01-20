import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Salary } from "./types";

const getEmployeeSalaryService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return baseRequest<Salary[]>(client, {
    url: "/Salary",
    data: {
      Action: "GetSalaryDetail",
      IsIncludeHistory: true,
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeSalaryService };
