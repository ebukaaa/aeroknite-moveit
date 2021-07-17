import { memo, useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { StyleSheet, Image, View, Keyboard, Text } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import MapView, { Marker, Callout } from "react-native-maps";
import { getDimensions } from "tools/dimensions";
import config from "tools/styles/config";
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
import { useLocations as Locations } from "./locations";
import { useStorage as Storage, useProps as storageProps } from "./storage";

export function useStore() {
  const { create, compose } = useMemo(() => StyleSheet, []);
  const {
    desiredHeight,
    storages,
    background: { accent: backgroundAccent },
  } = useMemo(
    () => ({
      storages: [
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
                  uri: "https://assets.centralindex.com/W/48/86dc60d4ff84cda957e5ff8e03e353aa.jpg",
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
                  uri: "https://www.bigyellow.co.uk/assets/images/stores/main/stockport.jpg",
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
                  uri: "https://www.safestore.co.uk/getmedia/c12471c7-23e7-4bd1-8d3a-e69ee5d3f3fd/3-Sheffield-trolley-bay-low-res.aspx?width=0",
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
                  uri: "https://lid.zoocdn.com/645/430/173b3e499c23dbf02c8c7a150a6664245c2e32b6.jpg",
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
      desiredHeight: 150,
      ...colors,
    }),
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

  const animatedHeight = useAnimatedStyle(() => ({
    height: withSpring(height.value, config),
  }));
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value, config),
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
      (props) => <Storage {...props} height={height} />,
      [height]
    ),
    Sheet: useMemo(() => {
      function useSheet({ children }) {
        const { containerStyles, barStyles, snapPoints } = useMemo(
          () => ({
            containerStyles: compose(
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
            ...create({
              barStyles: {
                backgroundColor: "#743A38",
                borderRadius: 100,
                height: 5,
                marginHorizontal: "40%",
              },
            }),
            snapPoints: {
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

        useEffect(() => {
          height.value = desiredHeight;
        }, []);

        return (
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={containerStyles}>
              <View style={barStyles} />

              {children}
            </Animated.View>
          </PanGestureHandler>
        );
      }

      return memo(useSheet, () => true);
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
      function useLayout({ children }) {
        return <>{children}</>;
      }

      return memo(useLayout, () => true);
    }, []),
    Map: useMemo(() => {
      function useMap() {
        const {
          appStyles,
          imageStyles,
          customMapStyle,
          initialRegion,
          pinMarker,
        } = useMemo(
          () => ({
            ...create({
              appStyles: { flex: 1 },
              imageStyles: {
                height: 32,
                width: 32,
              },
            }),
            customMapStyle: [
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
            initialRegion: {
              latitude: 52.3555,
              longitude: -1.3,
              latitudeDelta: 6,
              longitudeDelta: 3,
            },
            pinMarker: require("assets/pin.png"),
          }),
          []
        );

        const onDismiss = useCallback(() => {
          Keyboard.dismiss();
          height.value = desiredHeight;
          setOpacity(0);
          opacity.value = 0;
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
              location[0].places.map(
                ({ postcode, coordinates, street, uri }) => (
                  <Marker
                    key={name + postcode}
                    coordinate={coordinates}
                    title={name}
                    description={street}
                  >
                    <Image source={pinMarker} style={imageStyles} />

                    <Callout
                      tooltip
                      style={{
                        width: getDimensions(70).width,
                        borderRadius: 10,
                        overflow: "hidden",
                        paddingBottom: 13,
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "grey",
                          paddingVertical: 10,
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {name}
                      </Text>

                      <Image
                        source={{
                          uri,
                        }}
                        style={{
                          width: "100%",
                          height: getDimensions(null, 30).height,
                        }}
                      />

                      <View
                        style={{
                          backgroundColor: "grey",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            paddingVertical: 10,
                            textAlign: "center",
                          }}
                        >
                          {street}
                        </Text>
                      </View>

                      <View
                        style={{
                          borderLeftColor: "transparent",
                          borderRightColor: "transparent",
                          borderBottomColor: "transparent",
                          borderTopColor: "grey",
                          borderWidth: 10,
                          alignSelf: "center",
                          position: "absolute",
                          bottom: -4,
                        }}
                      />
                    </Callout>
                  </Marker>
                )
              )
            )}
          </MapView>
        );
      }

      return memo(useMap);
    }, [storages, desiredHeight, height, setOpacity, create]),
  };
}
