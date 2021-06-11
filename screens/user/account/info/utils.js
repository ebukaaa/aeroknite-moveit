import { memo, useCallback, useLayoutEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getCapitalised } from "tools/capitalise";
import { auth, db } from "tools/firebase";
import inputStyles from "tools/styles/input";
import { AntDesign } from "@expo/vector-icons";
import { string } from "prop-types";

export function useStore() {
  const {
    params: { title, info },
  } = useRoute();
  const { setOptions, navigate } = useNavigation();
  const [, setState] = useState(null);

  useLayoutEffect(() => {
    const Check = memo(
      ({ tintColor }) =>
        title === "profile" && (
          <TouchableOpacity
            onPress={setState.bind(null, (old) => {
              const user = auth().currentUser;
              const newUser = { ...old };

              if (old) {
                delete newUser?.password;
                delete newUser?.email;
                db.collection("users").doc(user.uid).update(newUser);
              }

              if (newUser?.name && newUser.name !== user.displayName) {
                user.updateProfile({
                  displayName: newUser?.name,
                });
              }

              if ((old?.email && old.email !== user.email) || old?.password) {
                navigate("Modal", {
                  user: old,
                  oldEmail: user.email,
                });
              } else {
                navigate("Dashboard", newUser);
              }

              return old;
            })}
          >
            <AntDesign name="check" size={20} color={tintColor} />
          </TouchableOpacity>
        )
    );

    Check.displayName = "Check";
    Check.propTypes = {
      tintColor: string.isRequired,
    };

    setOptions({
      headerTitle: getCapitalised(title),
      headerRight(props) {
        return <Check {...props} />;
      },
    });
  }, [title, setOptions, navigate]);

  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;

      return {
        inputsStyles: {
          inputStyles,
          ...create({
            containerStyles: {
              paddingTop: 50,
            },
          }),
        },
        ...create({
          appStyles: {
            flex: 1,
          },
        }),
      };
    }, []),
    title,
    info: useMemo(
      () => [
        ...info.map(({ id, data }) => {
          let extra;

          if (id === "name") {
            extra = {
              textContentType: "name",
            };
          } else if (id === "email") {
            extra = {
              textContentType: "emailAddress",
              keyboardType: "email-address",
            };
          } else if (id === "address") {
            extra = {
              textContentType: "fullStreetAddress",
            };
          } else if (id === "phone") {
            extra = {
              textContentType: "telephoneNumber",
              keyboardType: "phone-pad",
            };
          }

          return {
            id,
            data,
            ...extra,
          };
        }),
        {
          id: "password",
          textContentType: "password",
        },
      ],
      [info]
    ),
    getCapitalised,
    onChangeText: useCallback(
      (id, text) =>
        setState((old) => ({
          ...old,
          [id]: text.trim(),
        })),
      []
    ),
    SafeAreaView,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
  };
}
