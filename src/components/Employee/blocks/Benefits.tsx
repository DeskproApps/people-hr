import { useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { TSpan } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { Container } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Benefit, Salary } from "../../../services/peoplehr/types";

type Props = {
  benefits: Maybe<Benefit[]>,
  salary: Maybe<Salary>,
};

const BenefitItem: FC<Benefit & { currency?: Salary["Currency"] }> = ({
  Value,
  Benefit,
  currency,
  ExpiryDate,
  DateAwarded,
  RecoverOnTermination,
}) => {
  const value = useMemo(() => {
    return !Value ? "-" : [currency, Value].filter(Boolean).join(" ");
  }, [currency, Value]);

  return (
    <div style={{ marginBottom: 14 }}>
      <TSpan type="h3">{Benefit}</TSpan>
      <TwoProperties
        leftLabel="Date awarded"
        leftText={format(DateAwarded)}
        rightLabel="Expiry date"
        rightText={format(ExpiryDate)}
      />
      <TwoProperties
        leftLabel="Value"
        leftText={value}
        rightLabel="Recover on termination"
        rightText={RecoverOnTermination}
      />
    </div>
  )
};

const Benefits: FC<Props> = ({ benefits, salary }) => {
  return (!Array.isArray(benefits) || !size(benefits)) ? null : (
    <>
      <Container>
        <Title title="Benefits" />
        {benefits.map((benefit) => (
          <BenefitItem
            key={benefit.BenefitId}
            currency={get(salary, "Currency")}
            {...benefit}
          />
        ))}
      </Container>
      <HorizontalDivider/>
    </>
  );
};

export { Benefits };
