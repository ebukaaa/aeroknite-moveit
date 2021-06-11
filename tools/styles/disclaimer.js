import { StyleSheet } from "react-native";
import colors from "./colors";

const {
  text: { secondary },
} = colors;

export default StyleSheet.create({
  labelStyles: {
    fontSize: 12,
    color: secondary(),
    alignSelf: "center",
  },
});
