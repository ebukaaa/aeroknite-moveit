import { memo, useCallback, useLayoutEffect, useMemo } from "react";
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
import { node } from "prop-types";
import { useLocations as Locations } from "./locations";
import { useStorage as Storage, useProps as storageProps } from "./storage";

export function useStore() {
  const { create, compose } = useMemo(() => StyleSheet, []);
  const {
    background: { accent: backgroundAccent },
  } = useMemo(() => colors, []);
  const desiredHeight = useMemo(() => 150, []);
  const springConfig = useMemo(
    () => ({
      damping: 30,
      stiffness: 250,
      overshootClamping: true,
      restSpeedThreshold: 0.1,
      restDisplacementThreshold: 0.1,
    }),
    []
  );
  const storages = useMemo(
    () => [
      {
        name: "The Big Yellow Storage Company",
        about:
          "We provide secure and modern self storage units for homes and businesses nationwide. Founded in 1998 with our very first store in Richmond upon Thames, we now operate from a platform of 102 storage facilities, including 25 branded as Armadillo Self Storage. Big Yellow employs over 450 people and is listed on the FTSE 250 London Stock Exchange. We have also been listed in the Sunday Times Top 100 Companies to work for in 2019.",
        email: "customersupport@bigyellow.co.uk",
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
        about:
          "We strive to make storing your valued possessions simple and easy, which is why we offer convenient storage solutions for every need, at a price you’ll love.",
        email: "customerservice@safestore.co.uk",
        location: [
          {
            country: "UK",
            places: [
              {
                city: "Sheffield",
                postcode: "S3 8RW",
                street: "1 Russell Street Kelham Island",
                phone: "0114 553 5373",
                time: "09:00 — 21:00 • Mon — Fri",
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
  );
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const setOpacity = useCallback((value) => {
    const { initOpacity } = storageProps();

    if (initOpacity) {
      initOpacity.value = value;
    }
  }, []);
  const mapProps = useCallback(
    () => ({
      height,
    }),
    [height]
  );
  const animatedHeight = useAnimatedStyle(() => ({
    height: withSpring(height.value, springConfig),
  }));
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value, springConfig),
  }));

  return {
    stack: useMemo(() => createNativeStackNavigator(), []),
    screenOptions: useCallback(
      ({ route: { name } }) => {
        let options = {
          ...create({
            contentStyle: {
              backgroundColor: backgroundAccent(),
            },
          }),
        };

        if (name === "Locations") {
          options = {
            ...defaultOptions,
            ...options,
          };
        } else if (name === "Storage") {
          options = {
            ...defaultOptions,
            ...options,
            headerBackTitleVisible: false,
            contentStyle: compose(
              options.contentStyle,
              create({
                style: {
                  paddingHorizontal: "8%",
                },
              }).style
            ),
          };
        }

        return options;
      },
      [backgroundAccent, create, compose]
    ),
    useLocations: useCallback(
      (props) => (
        <Animated.View style={animatedOpacity}>
          <Locations {...props} storages={storages} />
        </Animated.View>
      ),
      [animatedOpacity, storages]
    ),
    useStorage: useCallback(
      (props) => <Storage {...props} mapProps={mapProps} />,
      [mapProps]
    ),
    Sheet: useMemo(() => {
      const useSheet = memo(
        ({ children }) => {
          useMemo(() => {
            useSheet.displayName = "useSheet";
            useSheet.propTypes = {
              children: node.isRequired,
            };
          }, []);

          const containerStyles = useMemo(
            () =>
              compose(
                create({
                  style: {
                    backgroundColor: backgroundAccent(),
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    paddingTop: 14,
                    shadowOffset: {
                      width: 0,
                      height: -1,
                    },
                    shadowRadius: 3,
                    shadowOpacity: 0.2,
                  },
                }).style,
                animatedHeight
              ),
            []
          );
          const barStyles = useMemo(
            () =>
              create({
                style: {
                  backgroundColor: "#743A38",
                  borderRadius: 100,
                  height: 5,
                  marginHorizontal: "40%",
                },
              }).style,
            []
          );
          const snapPoints = useMemo(
            () => ({
              top: {
                value: getDimensions(null, 90).height,
              },
              middle: {
                range: [
                  getDimensions(null, 40).height,
                  getDimensions(null, 60).height,
                ],
                value: getDimensions(null, 50).height,
              },
            }),
            []
          );
          const onGestureEvent = useAnimatedGestureHandler({
            onStart(_, context) {
              context.height = height.value;
            },
            onActive({ translationY }, context) {
              height.value = context.height - translationY;

              const {
                middle: { range: middleRange },
              } = snapPoints;
              const m1 = middleRange[0];

              if (height.value >= m1) {
                opacity.value = 1;
                runOnJS(setOpacity)(1);
              } else {
                opacity.value = 0;
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
          });

          useLayoutEffect(() => {
            height.value = desiredHeight;
            const keyboardWillShow = Keyboard.addListener(
              "keyboardWillShow",
              () => {
                const {
                  middle: { value, range: middleRange },
                } = snapPoints;
                const m2 = middleRange[1];
                if (height.value <= m2) {
                  height.value = value + 10;
                }
              }
            );

            return () => Keyboard.removeSubscription(keyboardWillShow);
          }, [snapPoints]);

          return (
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={containerStyles}>
                <View style={barStyles} />

                {children}
              </Animated.View>
            </PanGestureHandler>
          );
        },
        () => true
      );

      return useSheet;
    }, [
      opacity,
      animatedHeight,
      backgroundAccent,
      desiredHeight,
      height,
      compose,
      create,
      setOpacity,
    ]),
    Layout: useMemo(() => {
      const useLayout = memo(
        ({ children }) => {
          useMemo(() => {
            useLayout.displayName = "useLayout";
            useLayout.propTypes = {
              children: node.isRequired,
            };
          }, []);

          return <>{children}</>;
        },
        () => true
      );

      return useLayout;
    }, []),
    Map: useMemo(() => {
      const useMap = memo(() => {
        useMemo(() => (useMap.displayName = "useMap"), []);

        const appStyles = useMemo(
          () =>
            create({
              style: { flex: 1 },
            }).style,
          []
        );
        const imageStyles = useMemo(
          () =>
            create({
              style: {
                height: 32,
                width: 32,
              },
            }).style,
          []
        );
        const customMapStyle = useMemo(
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
        );
        const initialRegion = useMemo(
          () => ({
            latitude: 52.3555,
            longitude: -1.3,
            latitudeDelta: 6,
            longitudeDelta: 3,
          }),
          []
        );
        const pinMarker = useMemo(() => require("assets/pin.png"), []);
        const onDismiss = useCallback(() => {
          Keyboard.dismiss();
          height.value = desiredHeight;
          setOpacity(0);
        }, []);

        return (
          <MapView
            style={appStyles}
            customMapStyle={customMapStyle}
            provider="google"
            loadingEnabled
            initialRegion={initialRegion}
            loadingBackgroundColor="#585858"
            loadingIndicatorColor="#585858"
            onPress={onDismiss}
          >
            {storages.map(({ name, location }) =>
              location[0].places.map(({ postcode, coordinates, street }) => (
                <Marker
                  key={name + postcode}
                  coordinate={coordinates}
                  title={name}
                  description={street}
                >
                  <Image source={pinMarker} style={imageStyles} />
                </Marker>
              ))
            )}
          </MapView>
        );
      });

      return useMap;
    }, [storages, desiredHeight, height, setOpacity, create]),
  };
}
