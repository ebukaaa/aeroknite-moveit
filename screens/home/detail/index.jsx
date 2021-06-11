import { useStore } from "./utils";

export function useDetail() {
  const {
    styles: {
      appStyles,
      quotesStyles: { containerStyles: quotesStyles, labelStyles },
    },
    price,
    onQuotes,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
  } = useStore();

  return (
    <SafeAreaView style={appStyles}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "rgb(212,163,86)",
            }}
          >
            Dimension
          </Text>

          <View
            style={{
              backgroundColor: "#A2690C",
              borderRadius: 7,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
              height: 16,
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#621A17" }}
            >
              in cm
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
        >
          <Text style={{ color: "#937171" }}>W</Text>
          <Text style={{ color: "#937171" }}>•</Text>
          <Text style={{ color: "#937171" }}>12</Text>
          <Text style={{ color: "#937171" }}>•</Text>
          <Text style={{ color: "#937171" }}>H</Text>
          <Text style={{ color: "#937171" }}>•</Text>
          <Text style={{ color: "#937171" }}>13</Text>
          <Text style={{ color: "#937171" }}>•</Text>
          <Text style={{ color: "#937171" }}>L</Text>
          <Text style={{ color: "#937171" }}>•</Text>
          <Text style={{ color: "#937171" }}>15</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: "rgb(212,163,86)" }}
        >
          Weight
        </Text>

        <View
          style={{
            backgroundColor: "#A2690C",
            borderRadius: 7,
            width: 60,
            alignItems: "center",
            justifyContent: "center",
            height: 16,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "bold", color: "#621A17" }}>
            20 g
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: "rgb(212,163,86)" }}
        >
          Price
        </Text>

        <View
          style={{
            backgroundColor: "#A2690C",
            borderRadius: 7,
            width: 60,
            alignItems: "center",
            justifyContent: "center",
            height: 16,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "bold", color: "#621A17" }}>
            £ {price}
          </Text>
        </View>
      </View>

      <Text
        style={{ fontSize: 12, color: "rgb(212,163,86)", alignSelf: "center" }}
      >
        *Price is subject to changes
      </Text>

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
