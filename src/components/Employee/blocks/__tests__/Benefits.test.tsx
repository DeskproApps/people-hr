import { cleanup } from "@testing-library/react";
import { render, mockEmployeeSalary, mockEmployeeBenefit } from "../../../../../testing";
import { Benefits } from "../Benefits";

describe("Employee", () => {
  describe("Benefits", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Benefits
          benefits={mockEmployeeBenefit.Result as never[]}
          salary={mockEmployeeSalary.Result[0] as never}
        />
      ), { wrappers: { theme: true }});

      expect(await findByText(/Benefits/i)).toBeInTheDocument();
      expect(await findByText(/Gym Membership/i)).toBeInTheDocument();
      expect(await findByText(/25 May, 2023/i)).toBeInTheDocument();
      expect(await findByText(/25 May, 2030/i)).toBeInTheDocument();
      expect(await findByText(/£ 1000/i)).toBeInTheDocument();
    });
  });
});
