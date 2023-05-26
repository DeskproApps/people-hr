import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Training } from "./types";

const getEmployeeTrainingsService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return baseRequest<Training[]>(client, {
    url: "/Training",
    data: {
      Action: "GetTrainingDetail",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeTrainingsService };
