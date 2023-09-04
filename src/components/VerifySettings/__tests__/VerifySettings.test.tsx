import get from "lodash/get";
import omit from "lodash/omit";
import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockCompanyInformation } from "../../../../testing";
import { VerifySettings } from "../VerifySettings";
import type { Props } from "../VerifySettings";

const renderVerifySettingsPage = (props?: Partial<Props>) => render((
  <VerifySettings
    isLoading={get(props, ["isLoading"], false)}
    isDisabled={get(props, ["isDisabled"], false)}
    error={get(props, ["error"], null)}
    companyInfo={get(props, ["companyInfo"], null)}
    onVerifySettings={get(props, ["onVerifySettings"], jest.fn())}
  />
), { wrappers: { theme: true } });

describe("VerifySettings", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByRole } = renderVerifySettingsPage();

    const verifyButton = await findByRole("button", { name: /Verify Settings/i });

    expect(verifyButton).toBeInTheDocument();
  });

  test("should disable \"Verify\" button", async () => {
    const { findByRole } = renderVerifySettingsPage({ isDisabled: true });

    const verifyButton = await findByRole("button", { name: /Verify Settings/i });

    expect(verifyButton).toHaveAttribute("disabled");
  });

  test("should disable \"Verify\" button during loading", async () => {
    const { findByRole } = renderVerifySettingsPage({ isLoading: true });

    const verifyButton = await findByRole("button", { name: /Verify Settings/i });
    expect(verifyButton).toHaveAttribute("disabled");
  });

  test("should verify successfully", async () => {
    const { findByText } = renderVerifySettingsPage({ companyInfo: mockCompanyInformation.Result });

    expect(await findByText(/Verified as Deskpro/i)).toBeInTheDocument();
  });

  test("should show without company info", async () => {
    const company = omit(mockCompanyInformation.Result, ["CompanyName"]);

    const { queryByText } = renderVerifySettingsPage({ companyInfo: company as never });

    await waitFor(() => {
      expect(queryByText(/Verified as Deskpro/i)).not.toBeInTheDocument();
      expect(queryByText(/Verified as testdeskpro/i)).toBeInTheDocument();
    });
  });

  test("without company info and subdomain", async () => {
    const company = omit(mockCompanyInformation.Result, ["CompanyName", "SubDomain"]);

    const { queryByText } = renderVerifySettingsPage({ companyInfo: company as never });

    await waitFor(() => {
      expect(queryByText(/Verified as Deskpro/i)).not.toBeInTheDocument();
      expect(queryByText(/Verified as testdeskpro/i)).not.toBeInTheDocument();
      expect(queryByText(/Verified/i)).toBeInTheDocument();
    });
  });

  test("should click \"Verify\" button", async () => {
    const mockOnVerifySettings = jest.fn();
    const { findByRole } = renderVerifySettingsPage({ onVerifySettings: mockOnVerifySettings });

    const verifyButton = await findByRole("button", { name: /Verify Settings/i });

    await userEvent.click(verifyButton);

    expect(mockOnVerifySettings).toHaveBeenCalled();
  });

  test("should show error message if verify failed", async () => {
    const { findByText } = renderVerifySettingsPage({ error: "Invalid API Key." });

    expect(await findByText(/Invalid API Key./i)).toBeInTheDocument();
  });
});
