import { memo, useCallback, useLayoutEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import card from "tools/styles/card";
import buttonStyles from "tools/styles/button";
import colors from "tools/styles/colors";
import { getDimensions } from "tools/dimensions";
import { getCapitalised } from "tools/capitalise";
import { useBoxSVG, useSuitcaseSVG } from "tools";
import { MaterialIcons } from "@expo/vector-icons";

export function useStore() {
  const { navigate, setOptions } = useNavigation();

  useLayoutEffect(() => {
    const Quotes = memo(() => (
      <TouchableOpacity onPress={() => navigate("Quotes")}>
        <MaterialIcons
          name="request-quote"
          color={colors.text.accent()}
          size={20}
        />
      </TouchableOpacity>
    ));
    Quotes.displayName = "Quotes";

    setOptions({
      headerRight() {
        return <Quotes />;
      },
    });
  }, [setOptions, navigate]);

  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;
      const { containerStyles, titleStyles } = card;
      const {
        text: { normal: normalText },
      } = colors;

      return {
        ...create({
          dashboardStyles: {
            paddingBottom: 90,
          },
        }),
        sectionStyles: {
          containerStyles,
          titleStyles,
          itemsStyles: {
            ...create({
              containerStyles: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              },
            }),
            itemStyles: {
              ...create({
                containerStyles: {
                  alignItems: "center",
                },
                iconStyles: {
                  marginBottom: 10,
                  shadowOpacity: 0.2,
                  shadowRadius: 0.1,
                  shadowOffset: {
                    width: -2,
                    height: 2,
                  },
                },
                dimensionStyles: {
                  margin: 10,
                  color: normalText(),
                },
              }),
              priceStyles: buttonStyles(),
            },
          },
        },
      };
    }, []),
    items: useMemo(
      () => [
        {
          id: "Boxes",
          ratio: 784 / 750,
          SVG: useBoxSVG,
          prices: [
            {
              price: 15,
              dimension: "Small",
              size: 10,
            },
            {
              price: 20,
              dimension: "Medium",
              size: 15,
            },
            {
              price: 25,
              dimension: "Large",
              size: 20,
            },
          ],
        },
        {
          id: "Suitcases",
          ratio: 917 / 620,
          SVG: useSuitcaseSVG,
          prices: [
            {
              price: 20,
              dimension: "Small",
              size: 10,
            },
            {
              price: 25,
              dimension: "Medium",
              size: 15,
            },
            {
              price: 30,
              dimension: "Large",
              size: 20,
            },
          ],
        },
      ],
      []
    ),
    getCapitalised,
    onDetail: useCallback((params) => navigate("Detail", params), [navigate]),
    getWidth: useCallback((percent) => getDimensions(percent).width, []),
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
  };
}
