import { useCallback, useMemo } from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { screenOptions as defaultOptions } from "tools/options";
import { useAuth } from "./auth";
import { useAccount } from "./account/index.routes";

let user;
export function login(data) {
  if (user === data) {
    return;
  }
  user = data;
}

export function useStore() {
  return {
    user,
    stack: useMemo(() => createNativeStackNavigator(), []),
    screenOptions: useCallback(({ route: { name } }) => {
      let extra = {
        headerShown: false,
      };

      if (name === "Auth") {
        extra = {
          ...extra,
          replaceAnimation: "pop",
        };
      }
      if (name === "Account") {
        extra = {
          ...extra,
          replaceAnimation: "push",
        };
      }

      return {
        ...defaultOptions,
        ...extra,
      };
    }, []),
    useAuth,
    useAccount,
  };
}
