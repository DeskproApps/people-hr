import { useRoutes } from "react-router-dom";
import { Title } from "@deskpro/app-sdk";
import { PageBuilder } from "../PageBuilder";
import { LoadingAppPage } from "../../pages";
import { EmployeeFullName, Salary, Text } from "../blocks";
import type { FC } from "react";
import type { Dict } from "../../types";
import type { SourceConfig } from "../PageBuilder/types";

type Props = {
  //..
};

const blocksMap = {
  fullName: EmployeeFullName,
  text: Text,
  salary: Salary,
  title: Title,
};

const AppBuilder: FC<Props> = () => {
  return useRoutes([
    {
      path: "/",
      index: true,
      element: <LoadingAppPage />,
    },
    {
      path: "/employee/:employeeId",
      element: (
        <PageBuilder
          store={{
            employee: {
              source: "#api",
              url: "#mock/mockEmployee"
            },
            salary: {
              source: "#api",
              url: "#mock/mockEmployeeSalary"
            },
          } as Dict<SourceConfig>}
          blocksMap={blocksMap}
          config={{
            blocks: {
              name: {
                type: "fullName",
                pathInStore: ["employee", "Result"],
              },
              email: {
                type: "text",
                label: "Email address",
                pathInStore: ["employee", "Result", "EmailId", "DisplayValue"],
              },
              department: {
                type: "text",
                label: "Department",
                pathInStore: ["employee", "Result", "Department", "DisplayValue"],
              },
              role: {
                type: "text",
                label: "Role",
                pathInStore: ["employee", "Result", "JobRole", "DisplayValue"],
              },
              reportsTo: {
                type: "text",
                label: "Reports to",
                pathInStore: ["employee", "Result", "ReportsTo", "DisplayValue"],
              },
              gender: {
                type: "text",
                label: "Gender",
                pathInStore: ["employee", "Result", "Gender", "DisplayValue"],
              },
              salary: {
                type: "salary",
                label: "Salary",
                pathInStore: ["salary", "Result", "0"],
              },
            },
            structure: [
              ["name"],
              ["email"],
              ["department"],
              ["role"],
              ["reportsTo"],
              ["gender"],
              ["salary"],
            ],
          }}
        />
      ),
    },
    {
      path: "/not-found",
      element: (
        <PageBuilder
          blocksMap={blocksMap}
          config={{
            blocks: {
              title: {
                type: "title",
                props: { title: "No match found" },
              },
              description: {
                type: "text",
                props: { value: "Employee email address must match Deskpro user’s email address" },
              },
            },
            structure: [
              ["title"],
              ["description"],
            ],
          }}
        />
      ),
    },
  ]);
};

export { AppBuilder };
