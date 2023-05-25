import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useEmployee } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const { isLoading, employee, salary, holidays } = useEmployee();

  useSetTitle("Contact");

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
