import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee } from "./types";
import { mockEmployees } from "../../../testing";

const getEmployeesService = (client: IDeskproClient) => {
  return Promise.resolve(mockEmployees);
  return baseRequest<Employee[]>(client, {
    url: "/Employee",
    data: {
      Action: "GetAllEmployeeDetail",
    },
  });
};

export { getEmployeesService };
