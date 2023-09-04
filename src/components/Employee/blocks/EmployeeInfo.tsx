import get from "lodash/get";
import { Title, Property } from "@deskpro/app-sdk";
import { Container } from "../../common";
import { getFullName, getSalary } from "../../../utils";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Employee, Salary } from "../../../services/peoplehr/types";

type Props = {
  employee: Maybe<Employee>,
  salary: Maybe<Salary>,
};

const EmployeeInfo: FC<Props> = ({ employee, salary }) => {
  return (
    <Container>
      <Title title={getFullName(employee)} />
      <Property
        label="Email address"
        text={get(employee, ["EmailId", "DisplayValue"], "-")}
      />
      <Property
        label="Department"
        text={get(employee, ["Department", "DisplayValue"], "-")}
      />
      <Property
        label="Role"
        text={get(employee, ["JobRole", "DisplayValue"], "-")}
      />
      <Property
        label="Reports to"
        text={get(employee, ["ReportsTo", "DisplayValue"], "-")}
      />
      <Property
        label="Gender"
        text={get(employee, ["Gender", "DisplayValue"], "-")}
      />
      <Property
        label="Salary"
        text={getSalary(salary)}
      />
    </Container>
  );
};

export { EmployeeInfo };
