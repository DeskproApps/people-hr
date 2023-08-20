import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee, Training } from "./types";
import { mockEmployeeTrainings } from "../../../testing";

const getEmployeeTrainingsService = (
  client: IDeskproClient,
  employeeId: Employee["EmployeeId"]["DisplayValue"],
) => {
  return Promise.resolve(mockEmployeeTrainings);
  return baseRequest<Training[]>(client, {
    url: "/Training",
    data: {
      Action: "GetTrainingDetail",
      EmployeeId: employeeId,
    },
  });
};

export { getEmployeeTrainingsService };
