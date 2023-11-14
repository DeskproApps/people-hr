import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Benefit } from "./types";

const getEmployeeBenefitService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return baseRequest<Benefit[]>(client, {
    url: "/Benefit",
    data: {
      Action: "GetBenefitByEmployeeId",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeBenefitService };
