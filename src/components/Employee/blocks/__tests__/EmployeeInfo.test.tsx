import { cleanup } from "@testing-library/react";
import { render, mockEmployeeSalary, mockEmployee } from "../../../../../testing";
import { EmployeeInfo } from "../EmployeeInfo";

describe("Employee", () => {
  describe("EmployeeInfo", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <EmployeeInfo
          employee={mockEmployee.Result as never}
          salary={mockEmployeeSalary.Result[0] as never}
        />
      ), { wrappers: { theme: true } });

      expect(await findByText(/Cormac McCarthy/i)).toBeInTheDocument();
      expect(await findByText(/cormac.mccarthy@example.org/i)).toBeInTheDocument();
      expect(await findByText(/Development/i)).toBeInTheDocument();
      expect(await findByText(/Frontend Developer/i)).toBeInTheDocument();
      expect(await findByText(/Armen Tamzarian/i)).toBeInTheDocument();
      expect(await findByText(/Male/i)).toBeInTheDocument();
      expect(await findByText(/£ 250000/i)).toBeInTheDocument();
    });
  });
});
