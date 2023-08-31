import { cleanup } from "@testing-library/react";
import { render, mockEmployeeDocuments } from "../../../../../testing";
import { Documents } from "../Documents";

describe("Employee", () => {
  describe("Documents", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Documents documents={mockEmployeeDocuments.Result}/>
      ), { wrappers: { theme: true } });

      expect(await findByText(/Documents/i)).toBeInTheDocument();
      expect(await findByText(/World_Wide_Corp_lorem.pdf/i)).toBeInTheDocument();
      expect(await findByText(/Increment Letter/i)).toBeInTheDocument();
      expect(await findByText(/Thu, 25 May 2023/i)).toBeInTheDocument();
    });
  });
});
