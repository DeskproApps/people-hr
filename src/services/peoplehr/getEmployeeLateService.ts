import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Late } from "./types";
import { mockEmployeeLate } from "../../../testing";

type Data = {
  employeeId: Employee["EmployeeId"]["DisplayValue"],
  start: string,
  end: string,
};

const getEmployeeLateService = (
  client: IDeskproClient,
  { employeeId, start, end }: Data,
) => {
  return Promise.resolve(mockEmployeeLate);
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
