import { cleanup } from "@testing-library/react";
import { render, mockEmployeeTrainings, mockEmployeeSalary } from "../../../../../testing";
import { Trainings } from "../Trainings";

describe("Employee", () => {
  describe("Trainings", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Trainings
          trainings={mockEmployeeTrainings.Result as never[]}
          salary={mockEmployeeSalary.Result[0] as never}
        />
      ), { wrappers: { theme: true } });

      expect(await findByText(/English courses/i)).toBeInTheDocument();
      expect(await findByText(/Languages/i)).toBeInTheDocument();
      expect(await findByText(/Mandatory/i)).toBeInTheDocument();
      expect(await findByText(/Sun, 21 May 2023/i)).toBeInTheDocument();
      expect(await findByText(/Mon, 31 Jul 2024/i)).toBeInTheDocument();
      expect(await findByText(/Completed/i)).toBeInTheDocument();
      expect(await findByText(/£ 100/i)).toBeInTheDocument();

      expect(await findByText(/First emergency aid/i)).toBeInTheDocument();
      expect(await findByText(/Health & Safety/i)).toBeInTheDocument();
      expect(await findByText(/Optional/i)).toBeInTheDocument();
      expect(await findByText(/Outstanding/i)).toBeInTheDocument();
      expect(await findByText(/£ 250/i)).toBeInTheDocument();
    });
  });
});
