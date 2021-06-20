import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { View, TextInput } from "react-native";
import { useSearchSVG as SearchSVG } from "tools";
import { useStore } from "./utils";

const { Navigator, Screen } = createNativeStackNavigator();

function Sheet() {
  return (
    <View
      style={{
        paddingTop: 15,
      }}
    >
      <View
        style={{
          marginHorizontal: "8%",
          paddingVertical: 6,
          backgroundColor: "#937171",
          borderRadius: 200,
          flexDirection: "row",
        }}
      >
        <SearchSVG
          size={20}
          style={{
            marginLeft: 15,
            shadowOpacity: 0.2,
            shadowRadius: 0.8,
            shadowOffset: {
              width: -2,
              height: 1,
            },
          }}
        />
        <TextInput
          style={{
            flex: 1,
            paddingLeft: 8,
          }}
          placeholder="Search Storages"
        />
      </View>
    </View>
  );
}

export function useDashboard() {
  const {
    styles: { appStyles },
    storages,
    pinMarker,
    customMapStyle,
    Image,
    View,
    MapView,
    Marker,
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
              <Image
                source={pinMarker}
                style={{
                  height: 32,
                  width: 32,
                }}
              />
            </Marker>
          ))
        )}
      </MapView>

      <View
        style={{
          backgroundColor: "#621A17",
          position: "absolute",
          width: "100%",
          height: 142,
          bottom: 0,
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          paddingTop: 14,
        }}
      >
        <View
          style={{
            backgroundColor: "#743A38",
            borderRadius: 100,
            height: 5,
            marginHorizontal: "40%",
          }}
        />

        <Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: "transparent",
            },
            headerShown: false,
          }}
        >
          <Screen name="Sheet" component={Sheet} />
        </Navigator>
      </View>
    </>
  );
}
