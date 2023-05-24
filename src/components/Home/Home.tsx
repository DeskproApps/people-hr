import { HorizontalDivider } from "@deskpro/app-sdk";
import { EmployeeInfo } from "./EmployeeInfo";
// import { Requests } from "./Requests";
import { NoEmployeeFound } from "./NoEmployeeFound";
import type { FC } from "react";
import type { Maybe, EmployeeType } from "../../types";
import type { EmployeeSalary } from "../../services/peoplehr/types";

type Props = {
  employee: Maybe<EmployeeType>,
  salary: Maybe<EmployeeSalary>,
};

const Home: FC<Props> = ({ employee, salary }) => {
  if (!employee) {
    return <NoEmployeeFound/>;
  }

  return (
    <>
      <EmployeeInfo employee={employee} salary={salary} />
      <HorizontalDivider/>
      {/*<Requests/>*/}
    </>
  );
};

export { Home };
