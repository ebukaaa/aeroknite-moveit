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
import { string, bool } from "prop-types";
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
              const useIcon = memo(({ name: label, isFocused }) => {
                useMemo(() => {
                  useIcon.displayName = "Icon";
                  useIcon.propTypes = {
                    name: string.isRequired,
                    isFocused: bool.isRequired,
                  };
                }, []);

                const size = useMemo(() => 20, []);
                const { containerStyles: style } = useMemo(
                  () => iconStyles({}),
                  []
                );
                const { containerStyles: mapStyles } = useMemo(
                  () =>
                    iconStyles({
                      shadowRadius: 5,
                      shadowOffset: {
                        height: 0,
                        width: 0,
                      },
                    }),
                  []
                );
                const fill = useMemo(() => accentText(), []);
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
              });

              return useIcon;
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
            shadowColor: "black",
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
