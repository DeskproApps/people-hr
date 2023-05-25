import { match } from "ts-pattern";
import { Pill } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme } from "@deskpro/app-sdk";
import type { FC } from "react";
import type { Holiday } from "../../../services/peoplehr/types";

type Props = {
  status?: Holiday["Status"],
};

const Status: FC<Props> = ({ status }) => {
  const { theme } = useDeskproAppTheme();
  const options = match(status)
    .with("Approved", () => ({
      label: "Approved",
      bg: theme.colors.green100,
    }))
    .with("Pending", () => ({
      label: "Pending",
      bg: theme.colors.yellow100,
    }))
    .with("Declined", () => ({
      label: "Declined",
      bg: theme.colors.red100,
    }))
    .otherwise(() => null)

  return !options
    ? (<>-</>)
    : (
      <Pill
        label={options.label}
        textColor={theme.colors.white}
        backgroundColor={options.bg}
      />
    );
};

export { Status };
