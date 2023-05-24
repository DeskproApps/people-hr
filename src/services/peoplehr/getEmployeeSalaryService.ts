import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import { Employee } from "./types";

const getEmployeeSalaryService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return baseRequest(client, {
    url: "/Salary",
    data: {
      Action: "GetSalaryDetail",
      IsIncludeHistory: true,
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeSalaryService };
