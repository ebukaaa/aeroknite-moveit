import { useStore } from "./utils";

export function useStorage({ mapProps, height }) {
  const {
    styles: {
      animatedStyles,
      scrollStyles: {
        contentStyles: scrollStyles,
        buttonsStyles: {
          containerStyles: buttonsStyles,
          collectStyles: {
            containerStyles: collectStyles,
            labelStyles: collectLabelStyles,
          },
          storeStyles: {
            containerStyles: storeStyles,
            labelStyles: storeLabelStyles,
          },
        },
        fieldStyles: {
          containerStyles: fieldStyles,
          detailStyles,
          labelStyles: { containerStyles: labelStyles, titleStyles },
        },
      },
    },
    fields,
    buttons,
    View,
    Text,
    Animated,
    SafeAreaView,
    TouchableOpacity,
  } = useStore({ mapProps, height });

  return (
    <SafeAreaView>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={animatedStyles}
        contentContainerStyle={scrollStyles}
      >
        {fields.map(({ label, detail }) => (
          <View key={label} style={fieldStyles}>
            <View style={labelStyles}>
              <Text style={titleStyles}>{label}</Text>
            </View>
            <Text style={detailStyles}>{detail}</Text>
          </View>
        ))}

        <View style={buttonsStyles}>
          {buttons.map(({ label }, index) => (
            <TouchableOpacity
              key={label}
              style={index === 0 ? collectStyles : storeStyles}
            >
              <Text style={index === 0 ? collectLabelStyles : storeLabelStyles}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
