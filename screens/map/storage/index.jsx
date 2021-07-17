import { useStore } from "./utils";

export function useStorage({ height }) {
  const {
    styles: {
      animatedOpacity,
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
    fields,
    buttons,
    Text,
    View,
    About,
    Animated,
    SafeAreaView,
    TouchableOpacity,
  } = useStore({ height });

  return (
    <SafeAreaView>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={animatedOpacity}
        contentContainerStyle={scrollStyles}
      >
        {fields.map(({ id, detail }) => (
          <View key={id} style={fieldStyles}>
            <View style={labelStyles}>
              <Text style={titleStyles}>{id}</Text>
            </View>

            {id !== "About" ? (
              <Text style={detailStyles}>{detail}</Text>
            ) : (
              <About detail={detail} styles={detailStyles} />
            )}
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
export { useProps } from "./utils";
