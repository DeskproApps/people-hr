import size from "lodash/size";
import { Title } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { Container, TwoProperties, Status } from "../common";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Holiday as HolidayType } from "../../services/peoplehr/types";

type Props = {
  holidays: Maybe<HolidayType[]>,
};

const Holiday: FC<Pick<HolidayType, "Status"|"StartDate"|"EndDate"|"RequesterComments">> = ({
  Status: requestStatus,
  EndDate,
  StartDate,
  RequesterComments,
}) => (
  <div style={{ marginBottom: 14 }}>
    <TwoProperties
      leftLabel="Start date"
      leftText={format(StartDate)}
      rightLabel="End date"
      rightText={format(EndDate)}
    />
    <TwoProperties
      leftLabel="Approval status"
      leftText={<Status status={requestStatus}/>}
      rightLabel="Reason"
      rightText={RequesterComments}
    />
  </div>
);

const Requests: FC<Props> = ({ holidays }) => {
  return (
    <Container>
      <Title title={`Time off requests (${size(holidays)})`} />

      {(Array.isArray(holidays) ? holidays: []).map((holiday) => (
        <Holiday key={holiday.AnnualLeaveTxnId} {...holiday} />
      ))}
    </Container>
  );
};

export { Requests };
