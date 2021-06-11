import { useCallback, useMemo } from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { screenOptions as defaultOptions } from "tools/options";
import colors from "tools/styles/colors";
import { useDashboard } from "./dashboard";
import { useDetail } from "./detail";
import { useQuotes } from "./quotes";

export function useStore() {
  const {
    background: { accent: accentBackground, normal },
  } = useMemo(() => colors, []);

  return {
    stack: useMemo(() => createNativeStackNavigator(), []),
    screenOptions: useCallback(
      ({ route: { name } }) => {
        let extra;

        if (name === "Dashboard" || name === "Detail") {
          extra = {
            ...extra,
            headerLargeTitle: true,
          };
        }
        if (name === "Dashboard") {
          extra = {
            ...extra,
            headerStyle: {
              backgroundColor: normal(),
            },
          };
        }
        if (name === "Detail") {
          extra = {
            ...extra,
            headerHideShadow: true,
            contentStyle: {
              backgroundColor: accentBackground(),
            },
          };
        }
        if (name === "Quotes") {
          extra = {
            ...extra,
            headerTitle: "Get Quotes",
            headerBackTitleVisible: false,
            stackPresentation: "modal",
          };
        }

        return {
          ...defaultOptions,
          ...extra,
        };
      },
      [accentBackground, normal]
    ),
    useDashboard,
    useDetail,
    useQuotes,
  };
}
