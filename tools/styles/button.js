import { StyleSheet } from "react-native";
import colors from "./colors";

const {
  text: { secondary, primary },
  background: { secondary: secondaryBackground },
} = colors;
const { create } = StyleSheet;

export default function buttonStyles(isBig) {
  if (isBig) {
    return create({
      containerStyles: {
        paddingVertical: 14,
        alignSelf: "center",
        width: "40%",
        borderColor: secondaryBackground(),
        borderWidth: 2,
        borderRadius: 48,
        alignItems: "center",
        shadowOpacity: 0.3,
        shadowOffset: {
          height: 1,
        },
      },
      labelStyles: {
        fontSize: 15,
        color: secondary(),
      },
    });
  }
  return create({
    containerStyles: {
      backgroundColor: primary(),
      paddingVertical: 0.5 * 16,
      paddingHorizontal: 16,
      borderRadius: 10,
      alignSelf: "center",
      shadowOpacity: 0.1,
      shadowOffset: {
        height: 1,
      },
    },
    labelStyles: {
      fontSize: 0.6 * 16,
      color: secondary(),
    },
  });
}
