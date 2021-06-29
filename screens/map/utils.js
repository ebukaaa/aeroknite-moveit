import { useMemo } from "react";
import { StyleSheet, Image, View, useWindowDimensions } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import MapView, { Marker } from "react-native-maps";
import { getDimensions } from "tools/dimensions";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";
import { useSheet } from "./sheet";

export function useStore() {
  const { create } = useMemo(() => StyleSheet, []);
  const { height: desiredHeight } = useMemo(() => getDimensions(null, 70), []);
  const top = useSharedValue(desiredHeight);
  const springConfig = useMemo(
    () => ({
      damping: 15,
      mass: 1,
      stiffness: 150,
      overshoot: false,
      restSpeedThreshold: 0.1,
      restDisplacementThreshold: 0.1,
    }),
    []
  );
  const animatedStyle = useAnimatedStyle(() => ({
    top: withSpring(top.value, springConfig),
  }));
  const { height: deviceHeight } = useWindowDimensions();
  const snapPointsY = useMemo(
    () => [
      desiredHeight - 10,
      getDimensions(null, 50).height - 10,
      getDimensions(null, 20).height,
    ],
    [desiredHeight]
  );

  useMemo(
    () => (top.value = withSpring(desiredHeight, springConfig)),
    [top, desiredHeight, springConfig]
  );

  return {
    styles: useMemo(
      () => ({
        ...create({
          appStyles: { flex: 1 },
          imageStyles: {
            height: 32,
            width: 32,
          },
        }),
        sheetStyles: {
          animatedStyle,
          ...create({
            containerStyles: {
              backgroundColor: "#621A17",
              position: "absolute",
              width: "100%",
              bottom: 0,
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
        },
      }),
      [animatedStyle, create]
    ),
    stack: useMemo(() => createNativeStackNavigator(), []),
    screenOptions: useMemo(
      () => ({
        ...create({
          contentStyle: {
            backgroundColor: "transparent",
          },
        }),
        headerShown: false,
      }),
      [create]
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
    onGestureEvent: useAnimatedGestureHandler({
      onStart(_, context) {
        context.y = top.value;
      },
      onActive({ translationY }, context) {
        top.value = context.y + translationY;
      },
      onEnd({ y, velocityY }) {
        const snapPointY = snapPoint(y, velocityY, snapPointsY);
        // if (
        //   y >= getDimensions(null, 40).height &&
        //   y < getDimensions(null, 60).height
        // ) {
        // }
        top.value = withSpring(snapPointY, springConfig);
      },
    }),
    useSheet,
    Animated,
    View,
    Image,
    MapView,
    Marker,
    PanGestureHandler,
  };
}
