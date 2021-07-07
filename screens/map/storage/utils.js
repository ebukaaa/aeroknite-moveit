import { memo, useLayoutEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import colors from "tools/styles/colors";
import buttonStyles from "tools/styles/button";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useProps as sheetProps } from "../sheet/utils";

export function useStore({ mapProps, height }) {
  const { params: { name } = {} } = useRoute();
  const { setOptions, goBack, addListener } = useNavigation();
  const { create, compose } = useMemo(() => StyleSheet, []);
  const {
    text: { primary: primaryText, accent: accentText },
    background: {
      accent: accentBackground,
      primary: primaryBackground,
      other: otherBackground,
    },
  } = useMemo(() => colors, []);
  const opacity = useSharedValue(1);

  useFocusEffect(() => {
    mapProps().putOpacity(opacity);
  });

  useLayoutEffect(() => {
    addListener("beforeRemove", () => {
      if (height.value > 150) {
        sheetProps().initOpacity.value = 1;
      }
    });

    setOptions({
      title: name,
      headerLeft() {
        const Left = memo(() => {
          useMemo(() => (Left.displayName = "Left"), []);

          return (
            <TouchableOpacity
              onPress={() => {
                if (height.value > 150) {
                  sheetProps().initOpacity.value = 1;
                }
                goBack();
              }}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={accentText()}
              />
            </TouchableOpacity>
          );
        });

        return <Left />;
      },
    });
  }, [accentText, addListener, goBack, height.value, name, setOptions]);

  return {
    styles: {
      animatedStyles: useAnimatedStyle(() => ({
        opacity: withSpring(opacity.value, {
          damping: 30,
          stiffness: 250,
          overshootClamping: true,
          restSpeedThreshold: 0.1,
          restDisplacementThreshold: 0.1,
        }),
      })),
      ...useMemo(() => {
        const buttonStyle = buttonStyles(true);

        return {
          scrollStyles: {
            ...create({
              contentStyles: {
                paddingBottom: 90,
                paddingTop: 15,
              },
            }),
            buttonsStyles: {
              ...create({
                containerStyles: {
                  flexDirection: "row",
                  justifyContent: "space-around",
                },
              }),
              collectStyles: buttonStyle,
              storeStyles: {
                ...buttonStyle,
                containerStyles: compose(
                  buttonStyle.containerStyles,
                  create({
                    style: {
                      backgroundColor: primaryText(),
                    },
                  }).style
                ),
              },
            },
            fieldStyles: {
              ...create({
                containerStyles: {
                  paddingBottom: 30,
                },
                detailStyles: {
                  paddingTop: 10,
                  paddingLeft: 20,
                  color: otherBackground(),
                  lineHeight: 22,
                },
              }),
              labelStyles: create({
                containerStyles: {
                  width: 60,
                  borderRadius: 7,
                  paddingVertical: 4.8,
                  backgroundColor: primaryBackground(),
                },
                titleStyles: {
                  fontSize: 12,
                  textAlign: "center",
                  color: accentBackground(),
                  fontWeight: "800",
                },
              }),
            },
          },
        };
      }, [
        accentBackground,
        otherBackground,
        primaryBackground,
        primaryText,
        create,
        compose,
      ]),
    },
    buttons: useMemo(
      () => [
        {
          label: "Collect",
        },
        {
          label: "Store",
        },
      ],
      []
    ),
    fields: useMemo(
      () => [
        {
          label: "About",
          detail:
            "We strive to make storing your valued possessions simple and easy, which is why we offer convenient storage solutions for every need, at a price you’ll love.",
        },
        {
          label: "Contact",
          detail:
            "1 Russell Street Kelham Island \nS3 8RW, Sheffield \nUnited Kingdom \n0114 553 5373 \ncustomerservice@safestore.co.uk",
        },
        {
          label: "Time",
          detail: "09:00 — 21:00 • Mon — Fri",
        },
      ],
      []
    ),
    View,
    Text,
    Animated,
    SafeAreaView,
    TouchableOpacity,
  };
}
