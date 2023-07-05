import { useCallback } from "react";
import parse from "date-fns/parse";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useEmployee } from "./hooks";
import { API_FORMAT } from "../../constants";
import { /*Home, */PageBuilder } from "../../components";
import { EmployeeFullName, Salary, Text } from "../../components/blocks";
import type { FC } from "react";

const HomePage: FC = () => {
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
  } = useEmployee({ holidaysPeriodMax });

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

  // const storeConfig = {
  //   employee: {
  //     endpoint: {
  //       url: "https://api.peoplehr.net/Employee",
  //       method: "POST",
  //       data: { Action: "GetAllEmployeeDetail" }
  //     },
  //     pathInResponse: ["Result"],
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
  //   },
  // };

  // return (<Home {...store} />);
  return (
    <PageBuilder
      store={{
        employee: employee,
        salary: salary,
        holidays: holidays,
        benefits: benefits,
        documents: documents,
        lateness: lateness,
        qualifications: qualifications,
        trainings: trainings,
        onLoadNextHolidays: onLoadNextHolidays,
      }}
      blocksMap={{
        fullName: EmployeeFullName,
        text: Text,
        salary: Salary,
      }}
      config={{
        blocks: {
          name: {
            type: "fullName",
            keyInStore: "employee",
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

export { HomePage };
