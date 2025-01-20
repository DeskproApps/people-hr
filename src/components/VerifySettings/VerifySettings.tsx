import { useMemo } from "react";
import get from "lodash/get";
import styled from "styled-components";
import { P1, Stack, TSpan } from "@deskpro/deskpro-ui";
import { nbsp } from "../../constants";
import { Button } from "../common";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Company } from "../../services/peoplehr/types";

export type Props = {
  isLoading: boolean,
  isDisabled: boolean,
  error: Maybe<string>,
  companyInfo: Maybe<Company>,
  onVerifySettings: () => void,
};

const Invalid = styled(TSpan)`
  color: ${({ theme }) => theme.colors.red100};
`;

const VerifySettings: FC<Props> = ({
  error,
  isLoading,
  isDisabled,
  companyInfo,
  onVerifySettings,
}) => {
  const company = useMemo(() => {
    return get(companyInfo, ["CompanyName"]) || get(companyInfo, ["SubDomain"]);
  }, [companyInfo]);

  return (
    <Stack align="baseline">
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        disabled={isDisabled}
      />
      {nbsp}
      {companyInfo
        ? (
          <P1>
            Verified {company && (<>as {company}</>)}
          </P1>
        )
        : <Invalid type="p1">{error}</Invalid>
      }
    </Stack>
  );
};

export { VerifySettings };
