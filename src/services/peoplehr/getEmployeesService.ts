import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee } from "./types";

const getEmployeesService = (client: IDeskproClient) => {
  return baseRequest<Employee[]>(client, {
    url: "/Employee",
    data: {
      Action: "GetAllEmployeeDetail",
    },
  });
};

export { getEmployeesService };
