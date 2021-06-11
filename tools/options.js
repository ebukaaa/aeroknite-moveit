import colors from "./styles/colors";

const {
  text: { accent: accentText },
  background: { normal: normalBackground, accent: accentBackground },
} = colors;

export const screenOptions = {
  headerTintColor: accentText(),
  headerStyle: {
    backgroundColor: accentBackground(),
  },
  headerTranslucent: true,
  headerLargeTitleHideShadow: true,
  contentStyle: {
    backgroundColor: normalBackground(),
  },
};
