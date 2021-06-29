import { useStore } from "./utils";

export function useMap() {
  const {
    styles: {
      appStyles,
      imageStyles,
      sheetStyles: { animatedStyle, containerStyles: sheetStyles, barStyles },
    },
    customMapStyle,
    screenOptions,
    stack: { Navigator, Screen },
    storages,
    pinMarker,
    onGestureEvent,
    useSheet,
    Animated,
    Image,
    View,
    MapView,
    Marker,
    PanGestureHandler,
  } = useStore();

  return (
    <>
      <MapView
        style={appStyles}
        customMapStyle={customMapStyle}
        provider="google"
        loadingEnabled
        region={{
          latitude: 52.3555,
          longitude: -1.3,
          latitudeDelta: 6,
          longitudeDelta: 3,
        }}
        loadingBackgroundColor="#585858"
        loadingIndicatorColor="#585858"
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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[sheetStyles, animatedStyle]}>
          <View style={barStyles} />

          <Navigator screenOptions={screenOptions}>
            <Screen name="Sheet" component={useSheet} />
          </Navigator>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}
