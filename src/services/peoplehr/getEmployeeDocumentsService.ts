import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Document } from "./types";
import { mockEmployeeDocuments } from "../../../testing";

const getEmployeeDocumentsService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return Promise.resolve(mockEmployeeDocuments);
  return baseRequest<Document[]>(client, {
    url: "/EmployeeDocument",
    data: {
      Action: "GetAllDocument",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeDocumentsService };
