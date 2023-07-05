import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Employee } from "./types";

const getEmployeesService = (client: IDeskproClient) => {
  // return Promise.resolve({
  //   "Result": [
  //     {
  //       "EmployeeId": { "DisplayValue": "001" },
  //       "FirstName": { "DisplayValue": "Armen" },
  //       "LastName": { "DisplayValue": "Tamzarian" },
  //       "EmailId": { "DisplayValue": "armen.tamzarian@me.com" },
  //       "Department": { "DisplayValue": "Finance" },
  //       "JobRole":  { "DisplayValue": "Accountant" },
  //       "ReportsTo":  { "DisplayValue": "Emil Dudnik" },
  //       "Gender": { "DisplayValue": "Male" }
  //     },
  //     {
  //       "EmployeeId": { "DisplayValue": "002" },
  //       "FirstName": { "DisplayValue": "Daria" },
  //       "LastName": { "DisplayValue": "Makarova" },
  //       "EmailId": { "DisplayValue": "daria.makarova@me.com" },
  //       "Department": { "DisplayValue": "Design" },
  //       "JobRole":  { "DisplayValue": "Senior UI/UX designer" },
  //       "ReportsTo":  { "DisplayValue": "ilia makarov" },
  //       "Gender": { "DisplayValue": "" }
  //     },
  //     {
  //       "EmployeeId": { "DisplayValue": "003" },
  //       "FirstName": { "DisplayValue": "ilia" },
  //       "LastName": { "DisplayValue": "makarov" },
  //       "EmailId": { "DisplayValue": "ilia.makarov@me.com" },
  //       "Department": { "DisplayValue": "Development" },
  //       "JobRole":  { "DisplayValue": "Frontend Developer" },
  //       "ReportsTo":  { "DisplayValue": "Daria Makarova" },
  //       "Gender": { "DisplayValue": "Female" }
  //     }
  //   ]
  // }) as Promise<{ Result: Employee[] }>;
  return baseRequest<Employee[]>(client, {
    url: "/Employee",
    data: {
      Action: "GetAllEmployeeDetail",
    },
  });
};

export { getEmployeesService };
