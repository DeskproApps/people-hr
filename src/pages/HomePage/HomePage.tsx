import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useEmployee } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
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
  } = useEmployee();

  useSetTitle("Contact");

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home
      employee={employee}
      salary={salary}
      holidays={holidays}
      benefits={benefits}
      documents={documents}
      lateness={lateness}
      qualifications={qualifications}
      trainings={trainings}
    />
  );
};

export { HomePage };
