import { LoadingSpinner } from "@deskpro/app-sdk";
import { useEmployee } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const { isLoading, employee, salary, holidays } = useEmployee();

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home employee={employee} salary={salary} holidays={holidays} />
  );
};

export { HomePage };
