import { memo, useCallback, useLayoutEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSearchSVG as SearchSVG } from "tools";
import colors from "tools/styles/colors";
import cardStyles from "tools/styles/card";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

let initOpacity;

export function useStore({ mapProps }) {
  const { navigate, setOptions } = useNavigation();
  const { create, compose } = useMemo(() => StyleSheet, []);
  const opacity = useSharedValue(0);

  useFocusEffect(() => {
    mapProps().putOpacity(opacity);
  });

  useLayoutEffect(() => {
    initOpacity = opacity;

    const Header = memo(() => {
      useMemo(() => {
        Header.displayName = "Header";
      }, []);

      const searchStyles = useMemo(
        () =>
          create({
            containerStyles: {
              paddingVertical: 6,
              backgroundColor: colors.background.other(),
              borderRadius: 200,
              flexDirection: "row",
              width: "94%",
              overflow: "hidden",
            },
          }).containerStyles,
        []
      );
      const iconStyles = useMemo(
        () =>
          create({
            style: {
              marginLeft: 15,
              shadowOpacity: 0.2,
              shadowRadius: 0.8,
              shadowOffset: {
                width: -2,
                height: 1,
              },
            },
          }).style,
        []
      );
      const inputStyles = useMemo(
        () =>
          create({
            inputStyles: {
              paddingLeft: 8,
              // backgroundColor: "white",
              flex: 1,
            },
          }).inputStyles,
        []
      );

      return (
        <View style={searchStyles}>
          <SearchSVG size={20} style={iconStyles} />

          <TextInput style={inputStyles} placeholder="Search Storages" />
        </View>
      );
    });

    setOptions({
      headerCenter() {
        return <Header />;
      },
    });
  }, [mapProps, opacity, setOptions, create]);

  return {
    styles: {
      appStyles: compose(
        create({
          style: {
            flex: 1,
          },
        }).style,
        useAnimatedStyle(() => ({
          opacity: withSpring(opacity.value, {
            damping: 30,
            stiffness: 250,
            overshootClamping: true,
            restSpeedThreshold: 0.1,
            restDisplacementThreshold: 0.1,
          }),
        }))
      ),
      ...useMemo(() => {
        const {
          containerStyles: cardContainerStyles,
          titleStyles: cardTitleStyles,
        } = cardStyles;
        const {
          background: { accent: backgroundAccent },
          text: { accent: textAccent },
        } = colors;

        return {
          locationStyles: {
            ...create({
              textStyles: {
                color: textAccent(),
              },
              separatorStyles: {
                backgroundColor: "#937171",
                height: "100%",
                width: 2,
                borderRadius: 20,
              },
            }),
            infoStyles: {
              titleStyles: cardTitleStyles,
              ...create({
                containerStyles: {
                  flex: 1,
                  paddingRight: 10,
                },
              }),
              footerStyles: {
                ...create({
                  containerStyles: {
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                  timeStyles: {
                    color: textAccent(),
                    paddingVertical: 5,
                    fontWeight: "bold",
                    fontSize: 10,
                  },
                }),
                ratingStyles: {
                  tintColor: textAccent(),
                  ...create({
                    containerStyles: {
                      flexDirection: "row",
                    },
                  }),
                },
              },
            },
            containerStyles: compose(
              cardContainerStyles,
              create({
                style: {
                  backgroundColor: backgroundAccent(),
                  marginHorizontal: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingRight: 16,
                  shadowOpacity: 0.3,
                },
              }).style
            ),
          },
        };
      }, [create, compose]),
    },
    stars: useMemo(() => [...Array(5)], []),
    onNavigate: useCallback(
      (props) => {
        navigate("Storage", props);

        setTimeout(() => (opacity.value = 0), 120);
      },
      [opacity, navigate]
    ),
    View,
    Text,
    Animated,
    AntDesign,
    SafeAreaView,
    TouchableOpacity,
  };
}
export function useProps() {
  return {
    initOpacity,
  };
}
