import { cleanup } from "@testing-library/react";
import { render, mockEmployeeLate } from "../../../../../testing";
import { Lateness } from "../Lateness";

describe("Employee", () => {
  describe("Lateness", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Lateness lateness={mockEmployeeLate.Result}/>
      ), { wrappers: { theme: true } });

      expect(await findByText(/Lateness \(1\)/i)).toBeInTheDocument();
      expect(await findByText(/25 May, 2023/i)).toBeInTheDocument();
      expect(await findByText(/10/i)).toBeInTheDocument();
      expect(await findByText(/Train strike/i)).toBeInTheDocument();
    });
  });
});
