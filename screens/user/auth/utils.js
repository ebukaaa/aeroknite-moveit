import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, db } from "tools/firebase";
import inputStyles from "tools/styles/input";
import buttonStyles from "tools/styles/button";
import disclaimerStyles from "tools/styles/disclaimer";
import colors from "tools/styles/colors";
import { getCapitalised } from "tools/capitalise";

export function useStore() {
  const { params: { email: oldEmail } = {} } = useRoute();
  const [state, setState] = useState({
    user: { email: oldEmail },
  });
  const { replace } = useNavigation();

  useLayoutEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }
      const { uid: id } = user;
      const currentUser = db.collection("users").doc(id);
      const doc = await currentUser.get();

      replace("Account", doc.data());
    });
    return unsubscribe;
  }, [replace]);

  return {
    styles: useMemo(() => {
      const { create, compose } = StyleSheet;
      const button = buttonStyles(true);

      return {
        inputStyles,
        buttonStyles: {
          ...button,
          containerStyles: compose(
            button.containerStyles,
            create({
              extra: {
                marginTop: 20,
              },
            }).extra
          ),
        },
        disclaimerStyles: {
          primary: compose(
            disclaimerStyles.labelStyles,
            create({
              extra: {
                marginTop: 20,
              },
            }).extra
          ),
          ...create({
            secondary: {
              color: colors.text.normal(),
            },
          }),
        },
        ...create({
          authStyles: {
            flex: 1,
          },
          inputsStyles: {
            flex: 1,
            justifyContent: "center",
          },
        }),
      };
    }, []),
    state,
    inputs: useMemo(
      () => [
        {
          id: "name",
          textContentType: "name",
        },
        {
          id: "email",
          textContentType: "emailAddress",
          keyboardType: "email-address",
        },
        {
          id: "address",
          textContentType: "fullStreetAddress",
        },
        {
          id: "password",
          textContentType: "password",
        },
        {
          id: "phone",
          textContentType: "telephoneNumber",
          keyboardType: "phone-pad",
        },
      ],
      []
    ),
    getCapitalised,
    setState,
    onChangeText: useCallback(
      (input, value) =>
        setState((old) => ({
          ...old,
          user: {
            ...old?.user,
            [input]: value,
          },
        })),
      []
    ),
    onSignUp: setState.bind(null, (old) => {
      const { user: oldUser } = old || {};
      const { email, password, name } = oldUser || {};

      if (email && password && name) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async ({ user }) => {
            const { uid: id } = user;
            const newUser = {
              ...oldUser,
            };
            delete newUser?.password;

            db.collection("users").doc(id).set(newUser);
            user.updateProfile({
              displayName: name,
            });
          })
          .catch((error) => Alert.alert("Error Signing in", error.message));
      }

      return old;
    }),
    onLogin: setState.bind(null, (old) => {
      const { user: { email, password } = {} } = old || {};

      if (email && password) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .catch((error) => Alert.alert("Error Logging in", error.message));
      }
      return old;
    }),
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
  };
}
