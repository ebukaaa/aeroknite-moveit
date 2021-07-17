import { useMemo, useCallback, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  useWindowDimensions,
  Alert,
  TouchableOpacity,
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
import { auth, db } from "tools/firebase";
import colors from "tools/styles/colors";
import config from "tools/styles/config";
import buttonStyles from "tools/styles/button";

let putState;

function useStates() {
  const [, setState] = useState(null);
  useMemo(() => (putState = setState), []);

  return null;
}

export function useStore() {
  const { params } = useRoute();
  const { goBack, navigate, replace } = useNavigation();
  const { height: deviceHeight } = useWindowDimensions();
  const { height: desiredHeight } = useMemo(() => getDimensions(null, 70), []);
  const top = useSharedValue(deviceHeight);
  const animatedStyle = useAnimatedStyle(() => ({
    top: withSpring(top.value, config),
  }));
  const onGoBack = useCallback(
    (props) => {
      const { user } = props || {};
      top.value = deviceHeight;
      Keyboard.dismiss();
      setTimeout(() => (!user ? goBack() : navigate("Dashboard", user)), 290);
    },
    [top, deviceHeight, goBack, navigate]
  );
  const setHeight = useCallback(
    ({ velocityY }) =>
      putState((old) => {
        const { height: oldHeight } = old || {};

        if (top.value > oldHeight + 80 || velocityY >= 1400) {
          onGoBack();
        } else {
          top.value = oldHeight;
        }
        return old;
      }),
    [onGoBack, top]
  );

  useLayoutEffect(() => {
    top.value = withSpring(desiredHeight, config);
    putState((old) => ({
      ...old,
      height: desiredHeight,
    }));

    const keyboardWillShow = Keyboard.addListener(
      "keyboardWillShow",
      ({ endCoordinates: { height: keyboardHeight } }) => {
        const value = keyboardHeight - 15;
        top.value = value;
        putState((old) => ({
          ...old,
          height: value,
        }));
      }
    );

    return () => Keyboard.removeSubscription(keyboardWillShow);
  }, [top, desiredHeight]);

  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;
      const {
        background: { accent },
      } = colors;
      const { borderBottomColor } = create({
        styles: {
          borderBottomColor: accent(0.3),
        },
      }).styles;

      return {
        ...create({
          appStyles: {
            flex: 1,
          },
        }),
        modalStyles: {
          animatedStyle,
          ...create({
            containerStyles: {
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "#ffcfc9",
            },
          }),
          headerStyles: create({
            containerStyles: {
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
              paddingHorizontal: 20,
              borderBottomWidth: 1,
              borderBottomColor,
            },
            titleStyles: {
              fontWeight: "bold",
              color: accent(),
              fontSize: 15,
            },
            cancelStyles: {
              color: accent(0.8),
            },
          }),
          inputStyles: {
            placeholderColor: accent(0.5),
            ...create({
              containerStyles: {
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor,
                fontSize: 15,
                color: accent(0.9),
                marginBottom: 20,
              },
            }),
          },
          confirmStyles: buttonStyles(),
        },
      };
    }, [animatedStyle]),
    onConfirm: useCallback(
      () =>
        putState((old) => {
          const { password: oldPassword } = old || {};

          if (oldPassword) {
            const { oldEmail, user: newUser } = params || {};
            const { email: newEmail, password: newPassword } = newUser || {};

            auth()
              .signInWithEmailAndPassword(oldEmail, oldPassword)
              .then(({ user }) => {
                if (!params?.user) {
                  Alert.alert(
                    "Are you really sure?",
                    "You want to delete your account? You will lose all your storage data",
                    [
                      {
                        text: "No",
                        style: "cancel",
                      },
                      {
                        text: "Yes",
                        style: "destructive",
                        async onPress() {
                          await db.collection("users").doc(user.uid).delete();
                          user
                            .delete()
                            .then(() => {
                              replace("Auth");
                            })
                            .catch(({ message }) =>
                              Alert.alert("Error Deleting Account", message)
                            );
                        },
                      },
                    ]
                  );
                  return;
                }
                if (newPassword && newEmail) {
                  user.updatePassword(newPassword);
                  user.updateEmail(newEmail);
                } else if (newPassword) {
                  user.updatePassword(newPassword);
                } else if (newEmail) {
                  user.updateEmail(newEmail);
                }
                delete newUser?.password;
                db.collection("users").doc(user.uid).update(newUser);
                onGoBack({ user: newUser });
              })
              .catch(({ message }) =>
                Alert.alert("Error updating email", message)
              );
          }
          return old;
        }),
      [params, replace, onGoBack]
    ),
    onChangeText: useCallback(
      (id, text) =>
        putState((old) => ({
          ...old,
          [id]: text,
        })),
      []
    ),
    onGoBack,
    onGesture: useAnimatedGestureHandler({
      onStart(_, context) {
        context.startTop = top.value;
      },
      onActive({ translationY }, context) {
        top.value = context.startTop + translationY;
      },
      onEnd({ velocityY }) {
        runOnJS(setHeight)({ velocityY });
      },
    }),
    States: useStates,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Text,
    Animated,
    PanGestureHandler,
    TextInput,
  };
}
