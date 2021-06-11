import { useStore } from "./utils";

export function useM() {
  const {
    styles: { appStyles },
    View,
    Text,
  } = useStore();

  return (
    <View style={appStyles}>
      <Text>New mock</Text>
    </View>
  );
}
