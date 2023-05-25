import { HorizontalDivider } from "@deskpro/app-sdk";
import { EmployeeInfo } from "./EmployeeInfo";
import { Requests } from "./Requests";
import { NoEmployeeFound } from "./NoEmployeeFound";
import type { FC } from "react";
import type { Maybe, EmployeeType } from "../../types";
import type { Salary, Holiday } from "../../services/peoplehr/types";

type Props = {
  employee: Maybe<EmployeeType>,
  salary: Maybe<Salary>,
  holidays: Maybe<Holiday[]>,
};

const Home: FC<Props> = ({ employee, salary, holidays }) => {
  if (!employee) {
    return <NoEmployeeFound/>;
  }

  return (
    <>
      <EmployeeInfo employee={employee} salary={salary} />
      <HorizontalDivider/>
      <Requests holidays={holidays}/>
    </>
  );
};

export { Home };
