import { HorizontalDivider } from "@deskpro/app-sdk";
import {
  Holidays,
  Benefits,
  Lateness,
  Documents,
  Trainings,
  EmployeeInfo,
  Qualifications,
} from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type {
  Late,
  Salary,
  Holiday,
  Benefit,
  Document,
  Training,
  Qualification,
  Employee as EmployeeType,
} from "../../services/peoplehr/types";

type Props = {
  employee: Maybe<EmployeeType>,
  salary: Maybe<Salary>,
  holidays: Maybe<Holiday[]>,
  benefits: Maybe<Benefit[]>,
  documents: Maybe<Document[]>,
  lateness: Maybe<Late[]>,
  qualifications: Maybe<Qualification[]>,
  trainings: Maybe<Training[]>,
  onLoadNextHolidays: () => void,
};

const Employee: FC<Props> = ({
  employee,
  salary,
  holidays,
  benefits,
  lateness,
  documents,
  trainings,
  qualifications,
  onLoadNextHolidays,
}) => {
  return (
    <>
      <EmployeeInfo employee={employee} salary={salary} />
      <HorizontalDivider/>
      <Holidays holidays={holidays} onLoadNextHolidays={onLoadNextHolidays} />
      <Documents documents={documents} />
      <Lateness lateness={lateness} />
      <Benefits benefits={benefits} salary={salary} />
      <Qualifications qualifications={qualifications} />
      <Trainings trainings={trainings} salary={salary} />
    </>
  );
};

export { Employee };
