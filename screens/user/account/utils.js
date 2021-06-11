import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { screenOptions as defaultOptions } from "tools/options";
import colors, { getColor } from "tools/styles/colors";

export const { Navigator, Screen } = createNativeStackNavigator();

const {
  background: { accent, normal },
} = colors;

export function screenOptions({ route: { name } }) {
  let extra;

  if (name === "Dashboard" || name === "Info") {
    extra = {
      ...extra,
      headerLargeTitle: true,
    };
  }
  if (name === "Dashboard") {
    extra = {
      ...extra,
      title: "Account",
      headerStyle: {
        backgroundColor: normal(),
      },
    };
  }
  if (name === "Info") {
    extra = {
      ...extra,
      headerHideShadow: true,
      contentStyle: {
        backgroundColor: accent(),
      },
    };
  }
  if (name === "Modal") {
    extra = {
      ...extra,
      stackAnimation: "fade",
      stackPresentation: "transparentModal",
      contentStyle: {
        backgroundColor: getColor(0.3),
      },
    };
  }

  return {
    ...defaultOptions,
    ...extra,
  };
}

export { useDashboard } from "./dashboard";
export { useInfo } from "./info";
