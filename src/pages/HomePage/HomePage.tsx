import { useCallback } from "react";
import parse from "date-fns/parse";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useEmployee } from "./hooks";
import { API_FORMAT } from "../../constants";
import { Home, PageBuilder } from "../../components";
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

  // return (<Home {...store} />);
  return (
    <PageBuilder
      blocksMap={{
        fullName: EmployeeFullName,
        text: Text,
        salary: Salary,
      }}
      config={{
        blocks: {
          name: {
            type: "fullName",
            props: {
              pathInStore: ["employee"],
            },
          },
          email: {
            type: "text",
            props: {
              label: "Email address",
              pathInStore: ["employee", "email"],
            },
          },
          department: {
            type: "text",
            props: {
              label: "Department",
              pathInStore: ["employee", "department"],
            },
          },
          role: {
            type: "text",
            props: {
              label: "Role",
              pathInStore: ["employee", "role"],
            },
          },
          reportsTo: {
            type: "text",
            props: {
              label: "Reports to",
              pathInStore: ["employee", "reportsTo"],
            },
          },
          gender: {
            type: "text",
            props: {
              label: "Gender",
              pathInStore: ["employee", "gender"],
            },
          },
          salary: {
            type: "salary",
            props: {
              label: "Salary",
              pathInStore: ["salary"],
            }
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
      store={store}
    />
  );
};

export { HomePage };
