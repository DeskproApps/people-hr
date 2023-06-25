import { getSalary } from "../../../utils";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Salary as SalaryType } from "../../../services/peoplehr/types";

type Props = {
  value: Maybe<SalaryType>,
};

const Salary: FC<Props> = ({ value }) => (<>{getSalary(value)}</>);

export { Salary };
