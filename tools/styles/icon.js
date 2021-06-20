import { StyleSheet } from "react-native";

export default function iconStyles({
  shadowRadius = 0.1,
  shadowOffset: { height = 2, width = -2 } = {},
}) {
  return StyleSheet.create({
    containerStyles: {
      shadowOpacity: 0.2,
      shadowRadius,
      shadowOffset: {
        width,
        height,
      },
    },
  });
}
