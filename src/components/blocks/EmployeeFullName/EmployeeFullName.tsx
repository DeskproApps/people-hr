import { Title } from "@deskpro/app-sdk";
import { getFullName } from "../../../utils";
import type { FC } from "react";
import type { EmployeeType } from "../../../types";

type Props = {
  value:  EmployeeType,
};

const EmployeeFullName: FC<Props> = ({ value }) => {
  return (
    <Title title={getFullName(value)} />
  );
};

export { EmployeeFullName };
