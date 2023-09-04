import { useMemo } from "react";
import size from "lodash/size";
import { match } from "ts-pattern";
import { TSpan, Pill } from "@deskpro/deskpro-ui";
import {
  Title,
  TwoProperties,
  HorizontalDivider,
  useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { Container } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Training, Salary } from "../../../services/peoplehr/types";
import get from "lodash/get";

type Props = {
  trainings: Maybe<Training[]>,
  salary: Maybe<Salary>,
};

const TrainingItem: FC<Training & { currency?: Salary["Currency"] }> = ({
  Cost,
  Status,
  currency,
  Importance,
  Description,
  TrainingType,
  TrainingDate,
  TrainingExpiryDate,
}) => {
  const { theme } = useDeskproAppTheme();
  const trainingCost = useMemo(() => {
    return !Cost ? "-" : [currency, Cost].filter(Boolean).join(" ");
  }, [currency, Cost]);

  return (
    <div style={{ marginBottom: 14 }}>
      <TSpan type="h3">{Description}</TSpan>
      <TwoProperties
        leftLabel="Training"
        leftText={TrainingType}
        rightLabel="Importance"
        rightText={match(Importance)
          .with(1, () => "Mandatory")
          .with(2, () => "Optional")
          .otherwise(() => "-")
        }
      />
      <TwoProperties
        leftLabel="Training date"
        leftText={TrainingDate || "-"}
        rightLabel="Expiry date"
        rightText={TrainingExpiryDate || "-"}
      />
      <TwoProperties
        leftLabel="Status"
        leftText={![1,2,3,4].includes(Status) ? "-" : (
          <Pill
            textColor={theme.colors.white}
            backgroundColor={match(Status)
              .with(1, () => theme.colors.amethyst80)
              .with(2, () => theme.colors.cyan100)
              .with(3, () => theme.colors.yellow100)
              .with(4, () => theme.colors.green100)
              .run()
            }
            label={match(Status)
              .with(1, () => "Outstanding")
              .with(2, () => "Planned")
              .with(3, () => "In Progress")
              .with(4, () => "Completed")
              .run()
            }
          />)
        }
        rightLabel="Cost"
        rightText={trainingCost}
      />
    </div>
  );
}

const Trainings: FC<Props> = ({ trainings, salary }) => {
  return (!Array.isArray(trainings) || !size(trainings)) ? null : (
    <>
      <Container>
        <Title title="Training"/>
        {trainings.map((t) => (
          <TrainingItem
            key={t.TrainingId}
            currency={get(salary, "Currency")}
            {...t}
          />
        ))}
      </Container>
      <HorizontalDivider/>
    </>
  );
};

export { Trainings };
