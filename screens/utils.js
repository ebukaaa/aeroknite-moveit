import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { memo, useMemo } from "react";
import {
  useUserSVG as UserSVG,
  useHomeSVG as HomeSVG,
  useIconSVG as IconSVG,
} from "tools";
import { getDimensions } from "tools/dimensions";
import colors from "tools/styles/colors";
import iconStyles from "tools/styles/icon";
import { useHome } from "./home/index.routes";
import { useUser } from "./user/index.routes";
import { useMap } from "./map";

export function useStore() {
  return {
    tab: useMemo(() => createBottomTabNavigator(), []),
    options: useMemo(() => {
      const height = 45;
      const {
        background: { accent: accentBackground },
        text: { accent: accentText },
      } = colors;

      return {
        screenOptions({ route: { name } }) {
          function useTabBarIcon({ focused }) {
            const Icon = useMemo(() => {
              function useIcon({ name: label, isFocused }) {
                const { style, mapStyles, fill, size } = useMemo(
                  () => ({
                    style: iconStyles({}),
                    mapStyles: iconStyles({
                      shadowRadius: 5,
                      shadowOffset: {
                        height: 0,
                        width: 0,
                      },
                    }),
                    fill: accentText(),
                    size: 20,
                  }),
                  []
                );

                let icon;

                if (label === "User") {
                  icon = (
                    <UserSVG
                      size={size}
                      fill={isFocused && fill}
                      style={style}
                    />
                  );
                }
                if (label === "Home") {
                  icon = (
                    <HomeSVG
                      size={size}
                      fill={isFocused && fill}
                      style={style}
                    />
                  );
                }
                if (label === "Map") {
                  icon = <IconSVG size={55} style={mapStyles} />;
                }

                return icon;
              }

              return memo(useIcon);
            }, []);

            return <Icon name={name} isFocused={focused} />;
          }

          return {
            tabBarIcon: useTabBarIcon,
          };
        },
        tabBarOptions: {
          showLabel: false,
          style: {
            position: "absolute",
            bottom: getDimensions(null, 3).height,
            height,
            borderRadius: 48,
            borderTopWidth: 0,
            marginHorizontal: getDimensions(12).width,
            shadowOffset: {
              width: 0,
              height: -1,
            },
            shadowRadius: 3,
            shadowOpacity: 0.2,
            backgroundColor: accentBackground(),
          },
          tabStyle: {
            height,
          },
        },
      };
    }, []),
    useHome,
    useUser,
    useMap,
  };
}
