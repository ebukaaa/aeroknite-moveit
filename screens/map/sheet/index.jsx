import { useStore } from "./utils";

export function useSheet() {
  const {
    styles: {
      appStyles,
      searchStyles: { containerStyles: searchStyles, iconStyles, inputStyles },
    },
    SearchSVG,
    View,
    TextInput,
  } = useStore();

  return (
    <View style={appStyles}>
      <View style={searchStyles}>
        <SearchSVG size={20} style={iconStyles} />

        <TextInput style={inputStyles} placeholder="Search Storages" />
      </View>
    </View>
  );
}
