import { useMemo } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { useSearchSVG } from "tools";

export function useStore() {
  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;

      return {
        ...create({
          appStyles: {
            paddingTop: 15,
          },
        }),
        searchStyles: create({
          containerStyles: {
            marginHorizontal: "8%",
            paddingVertical: 6,
            backgroundColor: "#937171",
            borderRadius: 200,
            flexDirection: "row",
          },
          iconStyles: {
            marginLeft: 15,
            shadowOpacity: 0.2,
            shadowRadius: 0.8,
            shadowOffset: {
              width: -2,
              height: 1,
            },
          },
          inputStyles: {
            flex: 1,
            paddingLeft: 8,
          },
        }),
      };
    }, []),
    SearchSVG: useSearchSVG,
    View,
    TextInput,
  };
}
