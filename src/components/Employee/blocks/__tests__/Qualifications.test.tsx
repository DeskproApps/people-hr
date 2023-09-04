import { cleanup } from "@testing-library/react";
import { render, mockEmployeeQualifications } from "../../../../../testing";
import { Qualifications } from "../Qualifications";

describe("Employee", () => {
  describe("Qualifications", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Qualifications qualifications={mockEmployeeQualifications.Result as never[]}/>
      ), { wrappers: { theme: true } });

        expect(await findByText(/Qualifications/i)).toBeInTheDocument();
        expect(await findByText(/MSc/i)).toBeInTheDocument();
        expect(await findByText(/Computer Science/i)).toBeInTheDocument();
        expect(await findByText(/01 May, 2023/i)).toBeInTheDocument();
        expect(await findByText(/01 May, 2028/i)).toBeInTheDocument();
    });
  });
});
