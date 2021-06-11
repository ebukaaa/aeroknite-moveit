import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { memo } from "react";
import { useUserSVG as UserSVG, useHomeSVG as HomeSVG } from "tools";
import colors from "tools/styles/colors";
import { string, bool } from "prop-types";

const {
  background: { accent: accentBackground },
  text: { accent: accentText },
} = colors;

export const { Navigator, Screen } = createBottomTabNavigator();
export const tabBarOptions = {
  style: {
    position: "absolute",
    bottom: 5,
    height: 54,
    borderRadius: 48,
    borderTopWidth: 0,
    marginHorizontal: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    backgroundColor: accentBackground(),
  },
  showLabel: false,
};

const Icon = memo(({ tabName, isTab }) => {
  const size = 20;
  let icon;
  const style = {
    shadowOpacity: 0.2,
    shadowRadius: 0.1,
    shadowOffset: {
      width: -2,
      height: 2,
    },
  };

  if (tabName === "User") {
    icon = (
      <UserSVG
        width={size}
        height={(240 / 217) * size}
        fill={isTab && accentText()}
        style={style}
      />
    );
  }
  if (tabName === "Home") {
    icon = <HomeSVG width={size} fill={isTab && accentText()} style={style} />;
  }

  return icon;
});

Icon.displayName = "Icon";
Icon.propTypes = {
  tabName: string.isRequired,
  isTab: bool.isRequired,
};

export const screenOptions = ({ route: { name } }) => {
  function tabBarIcon({ focused }) {
    return <Icon tabName={name} isTab={focused} />;
  }

  return {
    tabBarIcon,
  };
};

export { useHome } from "./home/index.routes";
export { useUser } from "./user/index.routes";
