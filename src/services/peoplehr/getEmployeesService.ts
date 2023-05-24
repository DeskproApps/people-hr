import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employees } from "./types";

const getEmployeesService = (client: IDeskproClient) => {
  return baseRequest<Employees>(client, {
    url: "/Employee",
    data: {
      Action: "GetAllEmployeeDetail",
    },
  });
};

export { getEmployeesService };
