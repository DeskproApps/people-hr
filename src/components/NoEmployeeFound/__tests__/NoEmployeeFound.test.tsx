import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { NoEmployeeFound } from "../NoEmployeeFound";

describe("NoEmployeeFound", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((<NoEmployeeFound />), { wrappers: { theme: true } });

    expect(await findByText(/No match found/i)).toBeInTheDocument();
    expect(await findByText(/Employee email address must match Deskpro user’s email address/i)).toBeInTheDocument();
  });
});
