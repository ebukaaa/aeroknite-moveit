import { useStore } from "./utils";

export function useLocations({ storages }) {
  const {
    styles: {
      appStyles,
      locationStyles: {
        separatorStyles,
        containerStyles: locationStyles,
        infoStyles: {
          containerStyles: infoStyles,
          titleStyles: locationHeaderStyles,
          footerStyles: {
            containerStyles: footerStyles,
            timeStyles: locationTimeStyles,
            ratingStyles: { containerStyles: ratingStyles, tintColor },
          },
        },
        textStyles: locationTextStyles,
      },
    },
    stars,
    stores,
    onNavigate,
    View,
    Text,
    FlatList,
    AntDesign,
    SafeAreaView,
    TouchableOpacity,
  } = useStore({ storages });

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={appStyles}
        showsVerticalScrollIndicator={false}
        data={stores}
        renderItem={({ item }) => {
          const { name, street } = item;

          return (
            <TouchableOpacity
              style={locationStyles}
              activeOpacity={0.5}
              onPress={onNavigate.bind(null, item)}
            >
              <View style={infoStyles}>
                <Text style={locationHeaderStyles}>{name}</Text>
                <Text style={locationTextStyles}>{street}</Text>

                <View style={footerStyles}>
                  <Text style={locationTimeStyles}>
                    Open Now • 09:00 — 21:00
                  </Text>

                  <View style={ratingStyles}>
                    {stars.map((_, index) => (
                      <AntDesign
                        key={String(index)}
                        name="staro"
                        size={12}
                        color={tintColor}
                      />
                    ))}
                  </View>
                </View>
              </View>

              <View style={separatorStyles} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
