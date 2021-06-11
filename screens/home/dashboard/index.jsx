import { useStore } from "./utils";

export function useDashboard() {
  const {
    styles: {
      dashboardStyles,
      sectionStyles: {
        containerStyles: sectionStyles,
        titleStyles,
        itemsStyles: {
          containerStyles: itemsStyles,
          itemStyles: {
            containerStyles: itemStyles,
            iconStyles,
            dimensionStyles,
            priceStyles: {
              containerStyles: priceStyles,
              labelStyles: priceLabelStyles,
            },
          },
        },
      },
    },
    items,
    getCapitalised,
    onDetail,
    getWidth,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
  } = useStore();

  return (
    <SafeAreaView>
      <FlatList
        contentOffset={{ y: -1 }}
        contentContainerStyle={dashboardStyles}
        data={items}
        renderItem={({ item: { id, prices, SVG, ratio } }) => (
          <View style={sectionStyles}>
            <Text style={titleStyles}>{id}</Text>

            <View style={itemsStyles}>
              {prices.map(({ price, dimension, size }) => (
                <TouchableOpacity
                  key={price}
                  style={itemStyles}
                  activeOpacity={0.5}
                  onPress={onDetail.bind(null, {
                    title: `${getCapitalised(dimension)} ${id}`,
                    price,
                  })}
                >
                  <SVG
                    width={getWidth(size)}
                    height={getWidth(size) * ratio}
                    style={iconStyles}
                  />
                  <Text style={dimensionStyles}>{dimension}</Text>

                  <View style={priceStyles}>
                    <Text style={priceLabelStyles}>From £{price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
