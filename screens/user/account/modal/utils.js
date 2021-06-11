import { useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { getDimensions } from "tools/dimensions";

export function useStore() {
  const { navigate, goBack } = useNavigation();
  const {
    params: { newUser },
  } = useRoute();
  const { height } = useWindowDimensions();
  const { height: defaultHeight } = useMemo(() => getDimensions(null, 60), []);
  const defaultTransition = useMemo(
    () => ({
      damping: 80,
      overshootClamping: true,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
      stiffness: 500,
    }),
    []
  );
  const top = useSharedValue(height);
  const style = useAnimatedStyle(() => ({
    top: withSpring(top.value, defaultTransition),
  }));
  const onNavigate = useCallback(
    () => setTimeout(() => navigate("Dashboard", newUser), 290),
    [navigate, newUser]
  );
  const onGesture = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive({ translationY }, context) {
      top.value = context.startTop + translationY;
    },
    onEnd({ velocityY }) {
      if (top.value > defaultHeight + 100 || velocityY >= 1400) {
        top.value = height;
        runOnJS(onNavigate)();
      } else {
        top.value = defaultHeight;
      }
    },
  });

  useMemo(
    () => (top.value = withSpring(defaultHeight, defaultTransition)),
    [top, defaultHeight, defaultTransition]
  );

  return {
    style,
    styles: useMemo(
      () =>
        StyleSheet.create({
          appStyles: {
            flex: 1,
          },
        }),
      []
    ),
    onGoBack: goBack,
    onGesture,
    View,
    TouchableWithoutFeedback,
    Text,
    Animated,
    PanGestureHandler,
  };
}
