import { useCallback } from "react";
import size from "lodash/size";
import { TSpan } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { Container, TwoProperties, Status, Link } from "../../common";
import type { FC, MouseEvent } from "react";
import type { Maybe } from "../../../types";
import type { Holiday } from "../../../services/peoplehr/types";

type Props = {
  holidays: Maybe<Holiday[]>,
  onLoadNextHolidays: () => void,
};

const HolidayItem: FC<Pick<Holiday, "Status"|"StartDate"|"EndDate"|"RequesterComments">> = ({
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

const OnLoadNextHolidays: FC<Pick<Props, "onLoadNextHolidays">> = ({
  onLoadNextHolidays,
}) => {
  const onClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onLoadNextHolidays();
  }, [onLoadNextHolidays]);

  return (
    <Link href="#" onClick={onClick}>
      <TSpan type="h3">Load next 6 months...</TSpan>
    </Link>
  );
};

const Holidays: FC<Props> = ({ holidays, onLoadNextHolidays }) => {
  return (
    <>
      <Container>
        <Title title={`Time off requests (${size(holidays)})`} />

        {(Array.isArray(holidays) ? holidays: []).map((holiday) => (
          <HolidayItem key={holiday.AnnualLeaveTxnId} {...holiday} />
        ))}

        <OnLoadNextHolidays onLoadNextHolidays={onLoadNextHolidays} />
      </Container>
      <HorizontalDivider/>
    </>
  );
};

export { Holidays };
