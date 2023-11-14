import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Late } from "./types";

type Data = {
  employeeId: Employee["EmployeeId"]["DisplayValue"],
  start: string,
  end: string,
};

const getEmployeeLateService = (
  client: IDeskproClient,
  { employeeId, start, end }: Data,
) => {
  return baseRequest<Late[]>(client, {
    url: "/Late",
    data: {
      Action: "GetLateByEmployeeId",
      EmployeeId: employeeId,
      StartDate: start,
      EndDate: end,
    },
  });
};

export { getEmployeeLateService };
