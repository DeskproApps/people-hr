import omit from "lodash/omit";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { wrap, mockEmployees } from "../../../../testing";
import { useCheckIsExistEmployee } from "../hooks";
import { getEmployeesService } from "../../../services/peoplehr";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../../../services/peoplehr/getEmployeesService");

describe("useCheckIsExistEmployee", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should navigate to the Employee page", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (getEmployeesService as jest.Mock).mockResolvedValueOnce(mockEmployees);

    renderHook(
      () => useCheckIsExistEmployee(),
      { wrapper: ({ children }) => wrap(children, { query: true })},
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/employee/PW5");
    });
  });

  test("should navigate to the NoFound page", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (getEmployeesService as jest.Mock).mockResolvedValueOnce({
      ...mockEmployees,
      Result: omit(mockEmployees.Result, [2]), // delete the matched with context employee
    });

    renderHook(
      () => useCheckIsExistEmployee(),
      { wrapper: ({ children }) => wrap(children, { query: true })},
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/no-found");
    });
  });
});
