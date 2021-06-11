import { StyleSheet } from "react-native";
import colors from "./colors";

const {
  background: { secondary },
  text: { accent, primary },
} = colors;

export default {
  placeholderColor: accent(),
  ...StyleSheet.create({
    containerStyles: {
      alignSelf: "center",
      width: "80%",
      height: 48,
      backgroundColor: secondary(),
      paddingHorizontal: 28.8,
      borderRadius: 20,
      shadowColor: "rgb(0,0,0)",
      shadowOpacity: 0.1,
      marginBottom: 19.2,
      color: primary(),
    },
  }),
};
