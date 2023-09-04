import { LoadingSpinner } from "@deskpro/app-sdk";
import { useCheckIsExistEmployee } from "./hooks";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useCheckIsExistEmployee();

  return (
    <LoadingSpinner/>
  );
};

export { LoadingAppPage };
