import { memo, useLayoutEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import colors from "tools/styles/colors";
import config from "tools/styles/config";
import defaultButtonStyles from "tools/styles/button";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

let initOpacity;

export function useStore({ height }) {
  const { params: { name, about, street, postcode, city, phone, email } = {} } =
    useRoute();
  const { setOptions } = useNavigation();
  const { create, compose } = useMemo(() => StyleSheet, []);
  const {
    text: { primary: primaryText, secondary: secondaryText },
    background: {
      accent: accentBackground,
      primary: primaryBackground,
      other: otherBackground,
    },
  } = useMemo(() => colors, []);
  const opacity = useSharedValue(1);
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value, config),
  }));

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
      const buttonStyle = defaultButtonStyles(true);

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
              fontSize: 11,
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
          id: "About",
          detail: about,
        },
        {
          id: "Contact",
          detail: `${street} \n${postcode}, ${city} \nUnited Kingdom \n${phone} \n${email}`,
        },
        {
          id: "Time",
          detail: "09:00 — 21:00 • Mon — Fri",
        },
      ],
      [about, city, email, phone, postcode, street]
    ),
    About: useMemo(() => {
      function useAbout({ detail, styles }) {
        const [isShown, show] = useState(false);
        const { innerTextStyles } = useMemo(
          () =>
            create({
              innerTextStyles: {
                color: secondaryText(),
                paddingLeft: 20,
                paddingTop: 5,
              },
            }),
          []
        );
        const threshold = useMemo(() => detail?.length / 3, [detail?.length]);

        return (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={show.bind(null, (old) => !old)}
          >
            <Text style={styles}>
              {isShown || threshold < 143
                ? detail
                : `${detail?.substring(0, threshold)}...`}
            </Text>

            {threshold >= 143 && (
              <Text style={innerTextStyles}>
                Read {isShown ? "Less" : "More"}
              </Text>
            )}
          </TouchableOpacity>
        );
      }

      return memo(useAbout);
    }, [secondaryText, create]),
    Text,
    View,
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
