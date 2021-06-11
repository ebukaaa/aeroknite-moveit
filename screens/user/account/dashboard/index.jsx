import { useStore } from "./utils";

export function useDashboard() {
  const {
    styles: {
      accountStyles: { contentStyles },
      sectionStyles: {
        containerStyles,
        titleStyles,
        iconStyles: { containerStyles: iconStyles, iconColor },
        textStyles,
        infoStyles: { containerStyles: infoStyles, labelStyles, dataStyles },
      },
    },
    sections,
    getWidth,
    getCapitalised,
    onNavigate,
    Text,
    FlatList,
    View,
    TouchableOpacity,
    SafeAreaView,
  } = useStore();

  return (
    <SafeAreaView>
      <FlatList
        contentOffset={{ y: -1 }}
        contentContainerStyle={contentStyles}
        data={sections}
        renderItem={({ item: { id, SVG, icon, alert, info } }) => (
          <TouchableOpacity
            key={id}
            style={containerStyles}
            activeOpacity={0.5}
            onPress={
              info &&
              onNavigate.bind(null, {
                title: id,
                info,
              })
            }
          >
            <Text style={titleStyles}>{getCapitalised(id)}</Text>
            {info &&
              info.map(({ id: label, data }) => (
                <View key={label} style={infoStyles}>
                  <Text style={labelStyles}>{getCapitalised(label)}</Text>
                  <Text style={dataStyles}>
                    {label === "phone" || label === "address"
                      ? "*** *** ***"
                      : data}
                  </Text>
                </View>
              ))}
            {SVG && (
              <SVG
                name={icon}
                size={getWidth(40)}
                color={iconColor}
                style={iconStyles}
              />
            )}
            {alert && <Text style={textStyles}>{alert}</Text>}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
