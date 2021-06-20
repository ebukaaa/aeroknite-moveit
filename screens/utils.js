import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { memo, useMemo } from "react";
import {
  useUserSVG as UserSVG,
  useHomeSVG as HomeSVG,
  useIconSVG as IconSVG,
} from "tools";
import colors from "tools/styles/colors";
import { getDimensions } from "tools/dimensions";
import iconStyles from "tools/styles/icon";
import { string, bool } from "prop-types";
import { useHome } from "./home/index.routes";
import { useUser } from "./user/index.routes";
import { useMap } from "./map/index.routes";

export function useStore() {
  return {
    tab: useMemo(() => createBottomTabNavigator(), []),
    options: useMemo(() => {
      const {
        background: { accent: accentBackground },
        text: { accent: accentText },
      } = colors;
      const Icon = memo(({ tabName, isTab }) => {
        const size = 20;
        let icon;
        const { containerStyles: style } = iconStyles({});
        const { containerStyles: mapStyles } = iconStyles({
          shadowRadius: 5,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        });
        const fill = accentText();

        if (tabName === "User") {
          icon = <UserSVG size={size} fill={isTab && fill} style={style} />;
        }
        if (tabName === "Home") {
          icon = <HomeSVG size={size} fill={isTab && fill} style={style} />;
        }
        if (tabName === "Map") {
          icon = <IconSVG size={55} style={mapStyles} />;
        }

        return icon;
      });

      Icon.displayName = "Icon";
      Icon.propTypes = {
        tabName: string.isRequired,
        isTab: bool.isRequired,
      };

      return {
        screenOptions({ route: { name } }) {
          function tabBarIcon({ focused }) {
            return <Icon tabName={name} isTab={focused} />;
          }

          return {
            tabBarIcon,
          };
        },
        tabBarOptions: {
          style: {
            position: "absolute",
            bottom: 10,
            height: 45,
            borderRadius: 48,
            borderTopWidth: 0,
            marginHorizontal: getDimensions(12).width,
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
        },
      };
    }, []),
    useHome,
    useUser,
    useMap,
  };
}
