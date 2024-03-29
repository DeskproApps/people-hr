import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 1500,
    },
  },
});

enum QueryKey {
  EMPLOYEE = "employee",
  EMPLOYEES = "employees",
  EMPLOYEE_SALARY = "employeeSalary",
  EMPLOYEE_HOLIDAY = "employeeHoliday",
  EMPLOYEE_BENEFITS = "employeeBenefits",
  EMPLOYEE_DOCUMENTS = "employeeDocuments",
  EMPLOYEE_LATE = "employeeLate",
  EMPLOYEE_QUALIFICATIONS = "employeeQualifications",
  EMPLOYEE_TRAININGS = "employeeTrainings",
}

export { queryClient, QueryKey };
