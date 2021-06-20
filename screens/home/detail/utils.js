import { useCallback, useLayoutEffect, useMemo, Fragment } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { getDimensions } from "tools/dimensions";
import buttonStyles from "tools/styles/button";
import disclaimerStyles from "tools/styles/disclaimer";
import colors from "tools/styles/colors";
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
      const {
        text: { secondary },
        background: { accent, primary },
      } = colors;

      return {
        disclaimerStyles,
        quotesStyles: buttonStyles(),
        ...create({
          appStyles: {
            flex: 1,
            marginVertical: getDimensions(null, 28).height,
            justifyContent: "space-around",
            marginHorizontal: getDimensions(15).width,
          },
        }),
        headerStyles: {
          ...create({
            containerStyles: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
            titleStyles: {
              fontSize: 20,
              fontWeight: "bold",
              color: secondary(),
            },
          }),
          subHeaderStyles: {
            ...create({
              containerStyles: {
                backgroundColor: primary(),
                borderRadius: 7,
                width: 60,
                alignItems: "center",
                justifyContent: "center",
                height: 16,
              },
              titleStyles: {
                fontSize: 12,
                fontWeight: "bold",
                color: accent(),
              },
            }),
          },
        },
        dimensionStyles: create({
          containerStyles: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingTop: 10,
          },
          labelStyles: {
            color: "#937171",
          },
        }),
      };
    }, []),
    price,
    dimensions: useMemo(() => ["W", 12, "H", 13, "L", 15], []),
    onQuotes: useCallback(() => navigate("Quotes"), [navigate]),
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Fragment,
  };
}
