import { useStore } from "./utils";

export function useSheet({ mapProps }) {
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
    onNavigate,
    View,
    Text,
    Animated,
    AntDesign,
    SafeAreaView,
    TouchableOpacity,
  } = useStore({ mapProps });

  return (
    <SafeAreaView>
      <Animated.View style={appStyles}>
        <TouchableOpacity
          style={locationStyles}
          activeOpacity={0.5}
          onPress={onNavigate.bind(null, {
            name: "Safe Store",
            street: "1 Russell Street Kelham Island",
            time: "09:00 — 21:00",
          })}
        >
          <View style={infoStyles}>
            <Text style={locationHeaderStyles}>Safe Store</Text>
            <Text style={locationTextStyles}>
              1 Russell Street Kelham Island
            </Text>

            <View style={footerStyles}>
              <Text style={locationTimeStyles}>Open Now • 09:00 — 21:00</Text>

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
      </Animated.View>
    </SafeAreaView>
  );
}
