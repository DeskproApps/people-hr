import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

enum QueryKey {
  EMPLOYEES = "employees",
  EMPLOYEE_SALARY = "employeeSalary",
  EMPLOYEE_HOLIDAY = "employeeHoliday"
}

export { queryClient, QueryKey };