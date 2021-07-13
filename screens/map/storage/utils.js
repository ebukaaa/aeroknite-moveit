import { useLayoutEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import colors from "tools/styles/colors";
import buttonStyles from "tools/styles/button";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

let initOpacity;

export function useStore({ mapProps }) {
  const { params: { name, about, street, postcode, city, phone, email } = {} } =
    useRoute();
  const { setOptions } = useNavigation();
  const { create, compose } = useMemo(() => StyleSheet, []);
  const {
    text: { primary: primaryText },
    background: {
      accent: accentBackground,
      primary: primaryBackground,
      other: otherBackground,
    },
  } = useMemo(() => colors, []);
  const opacity = useSharedValue(1);
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value, {
      damping: 30,
      stiffness: 250,
      overshootClamping: true,
      restSpeedThreshold: 0.1,
      restDisplacementThreshold: 0.1,
    }),
  }));
  const { height } = useMemo(() => mapProps(), [mapProps]);

  useLayoutEffect(() => {
    initOpacity = opacity;

    if (height.value <= 150) {
      opacity.value = 0;
    }

    setOptions({
      title: name,
    });
  }, [height, name, opacity, setOptions]);

  return {
    styles: useMemo(() => {
      const buttonStyle = buttonStyles(true);

      return {
        ...create({
          contentStyles: {
            paddingBottom: 90,
            paddingTop: 15,
          },
        }),
        animatedOpacity,
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
      };
    }, [
      accentBackground,
      animatedOpacity,
      otherBackground,
      primaryBackground,
      primaryText,
      compose,
      create,
    ]),
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
          detail: about,
        },
        {
          label: "Contact",
          detail: `${street} \n${postcode}, ${city} \nUnited Kingdom \n${phone} \n${email}`,
        },
        {
          label: "Time",
          detail: "09:00 — 21:00 • Mon — Fri",
        },
      ],
      [about, city, email, phone, postcode, street]
    ),
    View,
    Text,
    Animated,
    SafeAreaView,
    TouchableOpacity,
  };
}
export function useProps() {
  return {
    initOpacity,
  };
}
