import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Holiday } from "./types";
import { mockEmployeeHoliday } from "../../../testing";

type Data = {
  employeeId: Employee["EmployeeId"]["DisplayValue"],
  start: string,
  end: string,
};

const getEmployeeHolidayService = (
  client: IDeskproClient,
  { employeeId, start, end }: Data,
) => {
  return Promise.resolve(mockEmployeeHoliday);
  return baseRequest<Holiday[]>(client, {
    url: "/Holiday",
    data: {
      Action: "GetHolidayDetail",
      EmployeeId: employeeId,
      StartDate: start,
      EndDate: end,
    },
  });
};

export { getEmployeeHolidayService };
