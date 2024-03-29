import type { To, ParamKeyValuePair } from "react-router-dom";
import type { DropdownValueType } from "@deskpro/deskpro-ui";
import type { Context, IDeskproClient } from "@deskpro/app-sdk";
import type { Response } from "./services/peoplehr/types";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

/** The date, in the format "yyyy-mm-dd" */
export type DateType = string;

/** Request types */
export type ApiRequestMethod = "GET"|"POST";

export type RequestParams = {
  url?: string,
  rawUrl?: string,
  method?: ApiRequestMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  headers?: Dict<string>,
  queryParams?: string|Dict<string>|ParamKeyValuePair[],
  settings?: Maybe<Settings>,
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Promise<Response<T>>;

/** Deskpro types */
export type Settings = {
  api_key?: string,
};

export type UserData = {
  type: "user",
  user: {
    id: string,
    firstName: string,
    lastName: string,
    emails: string[]
    primaryEmail: string,
    isAgent: boolean,
    isConfirmed: boolean,
    isDisabled: boolean,
    language: string,
    locale: string,
    name: string,
    titlePrefix: string,
  },
};

export type UserContext = Context<UserData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
;

/** Entities */
