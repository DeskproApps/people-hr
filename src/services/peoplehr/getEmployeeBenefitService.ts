import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Benefit } from "./types";
import { mockEmployeeBenefit } from "../../../testing";

const getEmployeeBenefitService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return Promise.resolve(mockEmployeeBenefit);
  return baseRequest<Benefit[]>(client, {
    url: "/Benefit",
    data: {
      Action: "GetBenefitByEmployeeId",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeBenefitService };
