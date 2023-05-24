import get from "lodash/get";
import { Title } from "@deskpro/app-sdk";
import { Container, Property } from "../common";
import type { FC } from "react";
import type { EmployeeType, Maybe } from "../../types";
import type { EmployeeSalary } from "../../services/peoplehr/types";

type Props = {
  employee: Maybe<EmployeeType>,
  salary: Maybe<EmployeeSalary>,
};

const EmployeeInfo: FC<Props> = ({ employee, salary }) => {
  const currency = get(salary, ["Currency"]);
  return (
    <Container>
      <Title title="John Jones" />
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
        text={currency ? `${currency} *****` : "-"}
      />
    </Container>
  );
};

export { EmployeeInfo };
