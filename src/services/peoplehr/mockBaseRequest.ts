import get from "lodash/get";
import replace from "lodash/replace";
import {
  mockContext,
  mockEmployee,
  mockEmployeeBenefit,
  mockEmployeeDocuments,
  mockEmployeeHoliday,
  mockEmployeeLate,
  mockEmployeeQualifications,
  mockEmployees,
  mockEmployeeSalary,
  mockEmployeeTrainings,
} from "../../../testing";
import type { Request } from "../../types";

const baseRequest: Request = async (client, { url }) => {
  return Promise.resolve(get({
    mockContext,
    mockEmployee,
    mockEmployeeBenefit,
    mockEmployeeDocuments,
    mockEmployeeHoliday,
    mockEmployeeLate,
    mockEmployeeQualifications,
    mockEmployees,
    mockEmployeeSalary,
    mockEmployeeTrainings,
  }, [replace(url, "$mock/", "")]));
};

export { baseRequest };
