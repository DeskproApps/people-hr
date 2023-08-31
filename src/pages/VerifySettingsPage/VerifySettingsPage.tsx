import { useMemo, useState, useCallback } from "react";
import get from "lodash/get";
import {
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { getCompanyInfoService } from "../../services/peoplehr";
import { VerifySettings } from "../../components";
import type { FC } from "react";
import type { Maybe, Settings } from "../../types";
import type { Company } from "../../services/peoplehr/types";

const VerifySettingsPage: FC = () => {
  const { client } = useDeskproAppClient();
  const [companyInfo, setCompanyInfo] = useState<Maybe<Company>>(null);
  const [settings, setSettings] = useState<Maybe<Settings>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const API_KEY = useMemo(() => get(settings, ["api_key"]), [settings]);
  const errorMessage = useMemo(() => "Failed to connect to SimpleMDM, settings seem to be invalid", []);

  const onVerifySettings = useCallback(() => {
    if (!client || !API_KEY) {
      return;
    }

    setIsLoading(true);
    setError("");
    setCompanyInfo(null);

    return getCompanyInfoService(client, { api_key: API_KEY })
      .then(({ Result }) => setCompanyInfo(Result))
      .catch((err) => {
        setError(get(err, ["data", "Message"]) || errorMessage);
      })
      .finally(() => setIsLoading(false));
  }, [client, API_KEY, errorMessage]);

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, [client]);

  return (
    <VerifySettings
      isLoading={isLoading}
      isDisabled={!API_KEY || isLoading}
      error={error}
      companyInfo={companyInfo}
      onVerifySettings={onVerifySettings}
    />
  );
};

export { VerifySettingsPage };
