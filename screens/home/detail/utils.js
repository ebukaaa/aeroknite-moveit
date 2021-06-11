import { useCallback, useLayoutEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { getDimensions } from "tools/dimensions";
import buttonStyles from "tools/styles/button";
import { useRoute, useNavigation } from "@react-navigation/native";

export function useStore() {
  const {
    params: { title, price },
  } = useRoute();
  const { setOptions, navigate } = useNavigation();

  useLayoutEffect(
    () =>
      setOptions({
        headerTitle: title,
      }),
    [title, setOptions]
  );

  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;

      return {
        quotesStyles: buttonStyles(),
        ...create({
          appStyles: {
            flex: 1,
            marginVertical: getDimensions(null, 28).height,
            justifyContent: "space-around",
            marginHorizontal: getDimensions(15).width,
          },
        }),
      };
    }, []),
    price,
    onQuotes: useCallback(() => navigate("Quotes"), [navigate]),
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
  };
}
