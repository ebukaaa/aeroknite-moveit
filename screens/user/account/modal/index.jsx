import { useStore } from "./utils";

export function useModal() {
  const {
    style,
    styles: { appStyles },
    onGesture,
    onGoBack,
    View,
    Text,
    TouchableWithoutFeedback,
    PanGestureHandler,
    Animated,
  } = useStore();

  return (
    <View style={appStyles}>
      <TouchableWithoutFeedback onPress={onGoBack}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>

      <PanGestureHandler onGestureEvent={onGesture}>
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "white",
            },
            style,
          ]}
        >
          <Text>Confirm changes</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
