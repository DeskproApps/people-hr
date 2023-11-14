import { useRoutes } from "react-router-dom";
import { Title, LoadingSpinner } from "@deskpro/app-sdk";
import { config } from "./config";
import { PageBuilder } from "../PageBuilder";
import { EmployeeFullName, Salary, Text } from "../blocks";
import type { FC } from "react";
import type { Props } from "../PageBuilder/types";

const blocksMap = {
  fullName: EmployeeFullName,
  text: Text,
  salary: Salary,
  title: Title,
  loadingSpinner: LoadingSpinner
};

const AppBuilder: FC = () => {
  const routes = config.map(({ page, ...routerParam }) => {
    return {
      ...routerParam,
      element: <PageBuilder blocksMap={blocksMap} config={page as Props["config"]} />
    };
  });

  return useRoutes(routes);
};

export { AppBuilder };
