import { cleanup } from "@testing-library/react";
import { render, mockEmployeeHoliday } from "../../../../../testing";
import { Holidays } from "../Holidays";

describe("Employee", () => {
  describe("Holidays", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Holidays
          holidays={mockEmployeeHoliday.Result as never[]}
          onLoadNextHolidays={jest.fn()}
        />
      ), { wrappers: { theme: true } });

      expect(await findByText(/Time off requests \(2\)/i)).toBeInTheDocument();

      expect(await findByText(/29 May, 2023/i)).toBeInTheDocument();
      expect(await findByText(/30 May, 2023/i)).toBeInTheDocument();
      expect(await findByText(/Declined/i)).toBeInTheDocument();
      expect(await findByText(/Requesting a day off/i)).toBeInTheDocument();

      expect(await findByText(/26 May, 2023/i)).toBeInTheDocument();
      expect(await findByText(/27 May, 2023/i)).toBeInTheDocument();
      expect(await findByText(/Approved/i)).toBeInTheDocument();
      expect(await findByText(/Summer Bank Holiday/i)).toBeInTheDocument();
    });
  });
});
