import { useStore } from "./utils";

export function useModal() {
  const {
    styles: {
      appStyles,
      modalStyles: {
        containerStyles: modalStyles,
        animatedStyle,
        inputStyles: { containerStyles: inputStyles, placeholderColor },
        headerStyles: {
          containerStyles: headerStyles,
          titleStyles,
          cancelStyles,
        },
        confirmStyles: {
          containerStyles: confirmStyles,
          labelStyles: confirmLabelStyles,
        },
      },
    },
    onConfirm,
    onGesture,
    onChangeText,
    onGoBack,
    States,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    PanGestureHandler,
    Animated,
    TextInput,
  } = useStore();

  return (
    <View style={appStyles}>
      <States />

      <TouchableWithoutFeedback onPress={onGoBack}>
        <View style={appStyles} />
      </TouchableWithoutFeedback>

      <PanGestureHandler onGestureEvent={onGesture}>
        <Animated.View style={[modalStyles, animatedStyle]}>
          <View style={headerStyles}>
            <Text style={titleStyles}>Confirm Changes</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={onGoBack}>
              <Text style={cancelStyles}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={inputStyles}
            secureTextEntry
            placeholder="Enter Password"
            placeholderTextColor={placeholderColor}
            onChangeText={onChangeText.bind(this, "password")}
          />

          <TouchableOpacity
            style={confirmStyles}
            activeOpacity={0.5}
            onPress={onConfirm}
          >
            <Text style={confirmLabelStyles}>Confirm</Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
