import get from "lodash/get";
import round from "lodash/round";
import { Title } from "@deskpro/app-sdk";
import { Container, Property } from "../common";
import { getFullName } from "../../utils";
import type { FC } from "react";
import type { EmployeeType, Maybe } from "../../types";
import type { Salary } from "../../services/peoplehr/types";

type Props = {
  employee: Maybe<EmployeeType>,
  salary: Maybe<Salary>,
};

const EmployeeInfo: FC<Props> = ({ employee, salary }) => {
  const currency = get(salary, ["Currency"]);
  const salaryAmount = get(salary, ["TotalSalaryAmount"]);

  return (
    <Container>
      <Title title={getFullName(employee)} />
      <Property
        label="Email address"
        text={get(employee, ["email"], "-")}
      />
      <Property
        label="Department"
        text={get(employee, ["department"], "-")}
      />
      <Property
        label="Role"
        text={get(employee, ["role"], "-")}
      />
      <Property
        label="Reports to"
        text={get(employee, ["reportsTo"], "-")}
      />
      <Property
        label="Gender"
        text={get(employee, ["gender"], "-")}
      />
      <Property
        label="Salary"
        text={(currency && salaryAmount) ? `${currency} ${round(Number(salaryAmount), 2)}` : "-"}
      />
    </Container>
  );
};

export { EmployeeInfo };
