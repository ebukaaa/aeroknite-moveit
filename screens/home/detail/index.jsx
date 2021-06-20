import { useStore } from "./utils";

export function useDetail() {
  const {
    styles: {
      appStyles,
      disclaimerStyles: { labelStyles: disclaimerStyles },
      quotesStyles: { containerStyles: quotesStyles, labelStyles },
      headerStyles: {
        containerStyles: headerStyles,
        titleStyles: headerTitleStyles,
        subHeaderStyles: {
          containerStyles: subHeaderStyles,
          titleStyles: subHeaderTitleStyles,
        },
      },
      dimensionStyles: {
        containerStyles: dimensionStyles,
        labelStyles: dimensionLabelStyles,
      },
    },
    dimensions,
    price,
    onQuotes,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Fragment,
  } = useStore();

  return (
    <SafeAreaView style={appStyles}>
      <View>
        <View style={headerStyles}>
          <Text style={headerTitleStyles}>Dimension</Text>

          <View style={subHeaderStyles}>
            <Text style={subHeaderTitleStyles}>in cm</Text>
          </View>
        </View>

        <View style={dimensionStyles}>
          {dimensions.map((dimension, index) => (
            <Fragment key={dimension}>
              <Text style={dimensionLabelStyles}>{dimension}</Text>

              {index !== dimensions.length - 1 && (
                <Text style={dimensionLabelStyles}>•</Text>
              )}
            </Fragment>
          ))}
        </View>
      </View>

      <View style={headerStyles}>
        <Text style={headerTitleStyles}>Weight</Text>

        <View style={subHeaderStyles}>
          <Text style={subHeaderTitleStyles}>20 g</Text>
        </View>
      </View>

      <View style={headerStyles}>
        <Text style={headerTitleStyles}>Price</Text>

        <View style={subHeaderStyles}>
          <Text style={subHeaderTitleStyles}>£ {price}</Text>
        </View>
      </View>

      <Text style={disclaimerStyles}>*Price is subject to changes</Text>

      <TouchableOpacity
        activeOpacity={0.5}
        style={quotesStyles}
        onPress={onQuotes}
      >
        <Text style={labelStyles}>Get Quotes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
