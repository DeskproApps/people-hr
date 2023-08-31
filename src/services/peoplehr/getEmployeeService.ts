import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee } from "./types";

const  getEmployeeService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return baseRequest(client, {
    url: "/Employee",
    data: {
      Action: "GetEmployeeDetailById",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeService };
