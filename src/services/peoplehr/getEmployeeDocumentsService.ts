import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Document } from "./types";

const getEmployeeDocumentsService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return baseRequest<Document[]>(client, {
    url: "/Benefit",
    data: {
      Action: "GetAllDocument",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeDocumentsService };
