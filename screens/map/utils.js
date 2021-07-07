import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { StyleSheet, Image, View, Keyboard } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import MapView, { Marker } from "react-native-maps";
import { getDimensions } from "tools/dimensions";
import colors from "tools/styles/colors";
import { screenOptions as defaultOptions } from "tools/options";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useSheet as Sheet } from "./sheet";
import { useStorage as Storage } from "./storage";

let putOpacity;

function useStates({ children }) {
  const [, setOpacity] = useState(null);

  useMemo(() => (putOpacity = setOpacity), []);

  return <>{children}</>;
}

export function useStore() {
  const { create } = useMemo(() => StyleSheet, []);
  const {
    background: { accent: backgroundAccent },
  } = useMemo(() => colors, []);
  const desiredHeight = useMemo(() => 150, []);
  const height = useSharedValue(desiredHeight);
  const snapPoints = useMemo(
    () => ({
      top: {
        value: getDimensions(null, 90).height,
      },
      middle: {
        range: [getDimensions(null, 40).height, getDimensions(null, 60).height],
        value: getDimensions(null, 50).height,
      },
    }),
    []
  );
  const setOpacity = useCallback(
    (value) =>
      putOpacity((old) => {
        const opacity = old;
        opacity.value = value;
        return opacity;
      }),
    []
  );
  const mapProps = useCallback(
    () => ({
      putOpacity,
    }),
    []
  );

  useLayoutEffect(() => {
    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", () => {
      const {
        middle: { value },
      } = snapPoints;
      height.value = value + 10;
    });

    return () => Keyboard.removeSubscription(keyboardWillShow);
  }, [height, snapPoints]);

  return {
    styles: {
      sheetStyles: {
        animatedStyle: useAnimatedStyle(() => ({
          height: withSpring(height.value, {
            damping: 30,
            stiffness: 250,
            overshootClamping: true,
            restSpeedThreshold: 0.1,
            restDisplacementThreshold: 0.1,
          }),
        })),
        ...useMemo(
          () =>
            create({
              containerStyles: {
                backgroundColor: backgroundAccent(),
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                paddingTop: 14,
              },
              barStyles: {
                backgroundColor: "#743A38",
                borderRadius: 100,
                height: 5,
                marginHorizontal: "40%",
              },
            }),
          [backgroundAccent, create]
        ),
      },
      ...useMemo(
        () => ({
          ...create({
            appStyles: { flex: 1 },
            imageStyles: {
              height: 32,
              width: 32,
            },
          }),
        }),
        [create]
      ),
    },
    customMapStyle: useMemo(
      () => [
        {
          featureType: "all",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified",
            },
            {
              saturation: "-100",
            },
            {
              invert_lightness: true,
            },
            {
              lightness: "11",
            },
            {
              gamma: "1.27",
            },
          ],
        },
        {
          featureType: "administrative.locality",
          elementType: "all",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "landscape.man_made",
          elementType: "all",
          stylers: [
            {
              hue: "#ff0000",
            },
            {
              visibility: "simplified",
            },
            {
              invert_lightness: true,
            },
            {
              lightness: "-10",
            },
            {
              gamma: "0.54",
            },
            {
              saturation: "45",
            },
          ],
        },
        {
          featureType: "poi.business",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified",
            },
            {
              hue: "#ff0000",
            },
            {
              saturation: "75",
            },
            {
              lightness: "24",
            },
            {
              gamma: "0.70",
            },
            {
              invert_lightness: true,
            },
          ],
        },
        {
          featureType: "poi.government",
          elementType: "all",
          stylers: [
            {
              hue: "#ff0000",
            },
            {
              visibility: "simplified",
            },
            {
              invert_lightness: true,
            },
            {
              lightness: "-24",
            },
            {
              gamma: "0.59",
            },
            {
              saturation: "59",
            },
          ],
        },
        {
          featureType: "poi.medical",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified",
            },
            {
              invert_lightness: true,
            },
            {
              hue: "#ff0000",
            },
            {
              saturation: "73",
            },
            {
              lightness: "-24",
            },
            {
              gamma: "0.59",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "all",
          stylers: [
            {
              lightness: "-41",
            },
          ],
        },
        {
          featureType: "poi.school",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified",
            },
            {
              hue: "#ff0000",
            },
            {
              invert_lightness: true,
            },
            {
              saturation: "43",
            },
            {
              lightness: "-16",
            },
            {
              gamma: "0.73",
            },
          ],
        },
        {
          featureType: "poi.sports_complex",
          elementType: "all",
          stylers: [
            {
              hue: "#ff0000",
            },
            {
              saturation: "43",
            },
            {
              lightness: "-11",
            },
            {
              gamma: "0.73",
            },
            {
              invert_lightness: true,
            },
          ],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              saturation: "45",
            },
            {
              lightness: "53",
            },
            {
              gamma: "0.67",
            },
            {
              invert_lightness: true,
            },
            {
              hue: "#ff0000",
            },
            {
              visibility: "simplified",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified",
            },
            {
              hue: "#ff0000",
            },
            {
              saturation: "38",
            },
            {
              lightness: "-16",
            },
            {
              gamma: "0.86",
            },
          ],
        },
      ],
      []
    ),
    stack: useMemo(() => createNativeStackNavigator(), []),
    screenOptions: useCallback(
      ({ route: { name } }) => {
        let options = {
          ...create({
            contentStyle: {
              backgroundColor: backgroundAccent(),
              paddingHorizontal: "8%",
            },
          }),
        };

        if (name === "Sheet") {
          options = {
            ...defaultOptions,
            ...options,
          };
        } else if (name === "Storage") {
          options = {
            ...defaultOptions,
            ...options,
            headerBackTitleVisible: false,
            headerLargeTitle: true,
          };
        }

        return options;
      },
      [backgroundAccent, create]
    ),
    storages: useMemo(
      () => [
        {
          name: "The Big Yellow Storage Company",
          location: [
            {
              country: "UK",
              places: [
                {
                  city: "Manchester",
                  postcode: "M3 4JH",
                  street: "1 New Elm Road",
                  phone: "0161 989 4346",
                  coordinates: {
                    latitude: 53.47665474747415,
                    longitude: -2.2593206731287445,
                  },
                },
                {
                  city: "Stockport",
                  postcode: "SK1 2AD",
                  street: "Bailey Road Portwood",
                  phone: "0161 476 9210",
                  coordinates: {
                    latitude: 53.41861893202355,
                    longitude: -2.146080473130963,
                  },
                },
              ],
            },
          ],
        },
        {
          name: "Safe Store",
          location: [
            {
              country: "UK",
              places: [
                {
                  city: "Sheffield",
                  postcode: "S3 8RW",
                  street: "1 Russell Street Kelham Island",
                  phone: "0114 553 5373",
                  coordinates: {
                    latitude: 53.38761157197384,
                    longitude: -1.4713035866252064,
                  },
                },
                {
                  city: "Liverpool",
                  postcode: "L1 0BG",
                  street: "Queens Dock Jordan Street",
                  phone: "0151 709 6622",
                  coordinates: {
                    latitude: 53.39639286690259,
                    longitude: -2.9806130937391333,
                  },
                },
              ],
            },
          ],
        },
      ],
      []
    ),
    pinMarker: useMemo(() => require("assets/pin.png"), []),
    onDismiss: useCallback(() => {
      Keyboard.dismiss();
      height.value = desiredHeight;
    }, [height, desiredHeight]),
    onGestureEvent: useAnimatedGestureHandler({
      onStart(_, context) {
        context.height = height.value;
      },
      onActive({ translationY }, context) {
        height.value = context.height - translationY;

        const {
          middle: { range: middleRange },
        } = snapPoints;
        const m1 = middleRange[0];
        const m2 = middleRange[1];

        if (height.value > m2) {
          runOnJS(setOpacity)(1);
        } else if (height.value >= m1 && height.value < m2) {
          runOnJS(setOpacity)(1);
        } else {
          runOnJS(setOpacity)(0);
          runOnJS(Keyboard.dismiss)();
        }
      },
      onEnd() {
        const {
          top: { value: topValue },
          middle: { range: middleRange, value: middleValue },
        } = snapPoints;
        const m1 = middleRange[0];
        const m2 = middleRange[1];

        if (height.value > m2) {
          height.value = topValue;
        } else if (height.value >= m1 && height.value < m2) {
          height.value = middleValue;
        } else {
          height.value = desiredHeight;
        }
      },
    }),
    useSheet: useCallback(
      (props) => <Sheet {...props} mapProps={mapProps} />,
      [mapProps]
    ),
    useStorage: useCallback(
      (props) => <Storage {...props} mapProps={mapProps} height={height} />,
      [mapProps, height]
    ),
    States: useStates,
    Animated,
    View,
    Image,
    MapView,
    Marker,
    PanGestureHandler,
  };
}
