import { StyleSheet } from "react-native";
import colors, { getColor } from "./colors";

const {
  background: { normal: normalBackground },
  text: { accent: accentText },
} = colors;

export default StyleSheet.create({
  containerStyles: {
    borderRadius: 16,
    minHeight: 8 * 16,
    padding: 1.4 * 16,
    marginHorizontal: 1.6 * 16,
    marginTop: 1.8 * 16,
    backgroundColor: normalBackground(),
    shadowColor: getColor(0.7),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.7,
  },
  titleStyles: {
    color: accentText(),
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
