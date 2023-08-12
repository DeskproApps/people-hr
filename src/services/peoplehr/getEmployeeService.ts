import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee } from "./types";
import { mockEmployee } from "../../../testing";

const getEmployeeService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return Promise.resolve(mockEmployee);
  return baseRequest<Employee>(client, {
    url: "/Employee",
    data: {
      Action: "GetEmployeeDetailById",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeService };
