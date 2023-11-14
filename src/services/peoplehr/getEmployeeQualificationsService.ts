import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Qualification } from "./types";

const getEmployeeQualificationsService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return baseRequest<Qualification[]>(client, {
    url: "/Qualification",
    data: {
      Action: "GetQualificationByEmployeeId",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeQualificationsService };
