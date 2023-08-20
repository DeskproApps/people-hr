import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Qualification } from "./types";
import { mockEmployeeQualifications } from "../../../testing";

const getEmployeeQualificationsService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return Promise.resolve(mockEmployeeQualifications);
  return baseRequest<Qualification[]>(client, {
    url: "/Qualification",
    data: {
      Action: "GetQualificationByEmployeeId",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeQualificationsService };
