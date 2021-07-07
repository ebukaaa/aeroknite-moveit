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
    onDismiss,
    onGestureEvent,
    useSheet,
    useStorage,
    States,
    Animated,
    Image,
    View,
    MapView,
    Marker,
    PanGestureHandler,
  } = useStore();

  return (
    <States>
      <MapView
        style={appStyles}
        customMapStyle={customMapStyle}
        provider="google"
        loadingEnabled
        initialRegion={{
          latitude: 52.3555,
          longitude: -1.3,
          latitudeDelta: 6,
          longitudeDelta: 3,
        }}
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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[sheetStyles, animatedStyle]}>
          <View style={barStyles} />

          <Navigator screenOptions={screenOptions}>
            <Screen name="Sheet" component={useSheet} />
            <Screen name="Storage" component={useStorage} />
          </Navigator>
        </Animated.View>
      </PanGestureHandler>
    </States>
  );
}
