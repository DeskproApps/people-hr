import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import "intersection-observer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TextDecoder, TextEncoder } from "util";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { lightTheme } from "@deskpro/deskpro-ui";
import { mockClient } from "./testing";
import type { IDeskproClient } from "@deskpro/app-sdk";
import {useDeskproLatestAppContext} from "@deskpro/app-sdk";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.TextEncoder = TextEncoder;
//for some reason the types are wrong, but this works
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.TextDecoder = TextDecoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.React = React;

const context = {
  type: "user",
  settings: {"verify_settings": null},
  data: {
    user: {
      id: "1010",
      name: "Bo Bartell",
      firstName: "Bo",
      lastName: "Bartell",
      titlePrefix: "Dr.",
      isDisabled: false,
      isAgent: false,
      isConfirmed: true,
      emails: ["cormac.mccarthy@example.org"],
      primaryEmail: "cormac.mccarthy@example.org",
      language: "English",
      locale: "en-US"
    },
    app: {},
    env: {},
    currentAgent: {}
  }
};

jest.mock("@deskpro/app-sdk", () => ({
  ...jest.requireActual("@deskpro/app-sdk"),
  useDeskproAppClient: () => ({ client: mockClient }),
  useDeskproAppEvents: (
    hooks: { [key: string]: (param: Record<string, unknown>) => void },
    deps: [] = []
  ) => {
    React.useEffect(() => {
      !!hooks.onChange && hooks.onChange(context);
      !!hooks.onShow && hooks.onShow(context);
      !!hooks.onReady && hooks.onReady(context);
      !!hooks.onAdminSettingsChange && hooks.onAdminSettingsChange(context.settings);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, deps);
  },
  useInitialisedDeskproAppClient: (
    callback: (param: Record<string, unknown>) => void
  ) => {
    callback({
      registerElement: () => {},
      deregisterElement: () => {},
      setTitle: () => {},
    });
  },
  useDeskproAppTheme: () => ({ theme: lightTheme }),
  proxyFetch: async () => fetch,
  LoadingSpinner: () => <>Loading...</>,
  useQueryWithClient: (
    queryKey: string[],
    queryFn: (client: IDeskproClient) => Promise<void>,
    options: object,
  ) => useQuery(queryKey, () => queryFn(mockClient as never), options),
  useDeskproLatestAppContext: () => ({ context }),
}));
