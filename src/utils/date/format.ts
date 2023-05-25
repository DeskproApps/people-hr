import { default as fnsFormat } from "date-fns/format";
import { DATE_FORMAT } from "../../constants";
import type { Maybe, DateType } from "../../types";

const format = (date: Maybe<DateType>, pattern = DATE_FORMAT): string => {
    if (!date) {
        return "-";
    }

    return fnsFormat(new Date(date), pattern);
};

export { format };
