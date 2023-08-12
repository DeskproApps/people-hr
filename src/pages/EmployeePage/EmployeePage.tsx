import { useCallback } from "react";
import parse from "date-fns/parse";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import { useSearchParams, useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useEmployee } from "./hooks";
import { API_FORMAT } from "../../constants";
import { /*Employee, */PageBuilder } from "../../components";
import { EmployeeFullName, Salary, Text } from "../../components/blocks";
import type { FC } from "react";

const EmployeePage: FC = () => {
  const { employeeId } = useParams();
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
  } = useEmployee({ employeeId, holidaysPeriodMax });

  const onLoadNextHolidays = useCallback(() => {
    const currentPeriodMax = parse(holidaysPeriodMax, API_FORMAT, new Date());
    setSearchParams([
      ["holidaysPeriodMax", format(addMonths(currentPeriodMax, 6), API_FORMAT)],
    ]);
  }, [holidaysPeriodMax, setSearchParams]);

  const store = {
    employee: employee,
    salary: salary,
    holidays: holidays,
    benefits: benefits,
    documents: documents,
    lateness: lateness,
    qualifications: qualifications,
    trainings: trainings,
    onLoadNextHolidays: onLoadNextHolidays,
  };

  useSetTitle("Contact");

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  // return (<Employee {...store} />);

  /*const storeConfig = {
    employee: {
      endpoint: {
        url: "https://api.peoplehr.net/Employee",
        method: "POST",
        body: { Action: "GetAllEmployeeDetail" }
      },
      pathInResponse: ["Result"],
      /!*find: {
        type: "array", // array|object
        key: "email",
        value: [
          ["$context", "data", "user", "primaryEmail"],
          ["$context", "data", "user", "emails"],
        ],
      },*!/
      find: {
        key: "user.email",
        value: {
          type: "array", // array|object
          // source: SourceType.Context,
          key: "email",
          value: [
            ["data", "user", "primaryEmail"],
            ["data", "user", "emails"],
          ],
          result: {
            true: "/employee",
            false: "/no_found",
          }
        },
      }

      //     expression: {
      //       if: {
      //         properties: {
      //           "$ref": [
      //             ["context", "data", "user", "primaryEmail"],
      //             ["context", "data", "user", "emails"],
      //           ],
      //         },
      //       }
      //     }
    },
  };*/
  return (
    <PageBuilder
      store={store}
      blocksMap={{
        fullName: EmployeeFullName,
        text: Text,
        salary: Salary,
      }}
      config={{
        blocks: {
          name: {
            type: "fullName",
            pathInStore: ["employee"],
          },
          email: {
            type: "text",
            label: "Email address",
            pathInStore: ["employee", "email"],
          },
          department: {
            type: "text",
            label: "Department",
            pathInStore: ["employee", "department"],
          },
          role: {
            type: "text",
            label: "Role",
            pathInStore: ["employee", "role"],
          },
          reportsTo: {
            type: "text",
            label: "Reports to",
            pathInStore: ["employee", "reportsTo"],
          },
          gender: {
            type: "text",
            label: "Gender",
            pathInStore: ["employee", "gender"],
          },
          salary: {
            type: "salary",
            label: "Salary",
            pathInStore: ["salary"],
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
  );
};

export { EmployeePage };
