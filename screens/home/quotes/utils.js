import { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";

export function useStore() {
  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          appStyles: { flex: 1 },
        }),
      []
    ),
    View,
    Text,
  };
}
