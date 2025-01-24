
import { Property } from "@deskpro/app-sdk";
import { Container } from "../../common";
import { getFullName, getSalary } from "../../../utils";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Employee, Salary } from "../../../services/peoplehr/types";
import { H1 } from "@deskpro/deskpro-ui";

type Props = {
  employee: Maybe<Employee>,
  salary: Maybe<Salary>,
};

const EmployeeInfo: FC<Props> = ({ employee, salary }) => {
  return (
    <Container>
      <div style={{
        marginBottom: "14px"
      }}>
        <H1>{getFullName(employee)}</H1>
      </div>
      <Property
        label="Email address"
        text={employee?.EmailId.DisplayValue?? "-"}
      />
      <Property
        label="Department"
        text={employee?.Department.DisplayValue ?? "-" }
      />
      <Property
        label="Role"
        text={employee?.JobRole.DisplayValue ?? "-" }
      />
      <Property
        label="Reports to"
        text={employee?.ReportsTo.DisplayValue ?? "-" }
      />
      <Property
        label="Gender"
        text={employee?.Gender.DisplayValue ?? "-"}
      />
      <Property
        label="Salary"
        text={getSalary(salary)}
      />
    </Container>
  );
};

export { EmployeeInfo };
