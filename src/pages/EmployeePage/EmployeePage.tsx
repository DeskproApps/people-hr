import { useCallback } from "react";
import parse from "date-fns/parse";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import { useSearchParams, useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useEmployee } from "./hooks";
import { API_FORMAT } from "../../constants";
import { Employee } from "../../components";
import type { FC } from "react";

const EmployeePage: FC = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const holidaysPeriodMax = searchParams.get("holidaysPeriodMax") || format(addMonths(new Date(), 6), API_FORMAT);
  const {
    salary,
    employee,
    holidays,
    benefits,
    lateness,
    documents,
    isLoading,
    trainings,
    qualifications,
  } = useEmployee({ employeeId: id, holidaysPeriodMax });

  const onLoadNextHolidays = useCallback(() => {
    const currentPeriodMax = parse(holidaysPeriodMax, API_FORMAT, new Date());
    setSearchParams([
      ["holidaysPeriodMax", format(addMonths(currentPeriodMax, 6), API_FORMAT)],
    ]);
  }, [holidaysPeriodMax, setSearchParams]);

  useSetTitle("Contact");

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Employee
      employee={employee}
      salary={salary}
      holidays={holidays}
      benefits={benefits}
      documents={documents}
      lateness={lateness}
      qualifications={qualifications}
      trainings={trainings}
      onLoadNextHolidays={onLoadNextHolidays}
    />
  );
};

export { EmployeePage };
