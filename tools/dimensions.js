import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export function getDimensions(percentWidth, percentHeight) {
  return {
    width: percentWidth && (percentWidth * width) / 100,
    height: percentHeight && (percentHeight * height) / 100,
  };
}
