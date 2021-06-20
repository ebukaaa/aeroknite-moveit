import { useNavigation, useRoute } from "@react-navigation/native";
import { memo, useCallback, useLayoutEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { useSuitcaseSVG, useTruckSVG } from "tools";
import card from "tools/styles/card";
import colors from "tools/styles/colors";
import iconStyles from "tools/styles/icon";
import { getCapitalised } from "tools/capitalised";
import { auth } from "tools/firebase";
import { getDimensions } from "tools/dimensions";
import { AntDesign } from "@expo/vector-icons";

export function useStore() {
  const { setOptions, navigate, replace } = useNavigation();
  const { params } = useRoute();

  useLayoutEffect(() => {
    const tintColor = colors.text.accent();

    const Logout = memo(() => (
      <TouchableOpacity
        onPress={() =>
          auth()
            .signOut()
            .then(() => replace("Auth", { email: params?.email }))
        }
      >
        <AntDesign name="logout" color={tintColor} size={20} />
      </TouchableOpacity>
    ));
    Logout.displayName = "Logout";

    const Delete = memo(() => (
      <TouchableOpacity
        onPress={() =>
          navigate("Modal", {
            oldEmail: params.email,
          })
        }
      >
        <AntDesign name="deleteuser" color={tintColor} size={20} />
      </TouchableOpacity>
    ));
    Delete.displayName = "Delete";

    setOptions({
      headerLeft() {
        return <Logout />;
      },
      headerRight() {
        return <Delete />;
      },
    });
  }, [params.email, replace, setOptions, navigate]);

  return {
    styles: useMemo(() => {
      const { create, compose } = StyleSheet;
      const { containerStyles, titleStyles } = card;
      const {
        text: { normal, secondary },
        icon: { normal: normalIcon },
      } = colors;

      return {
        accountStyles: create({
          contentStyles: {
            paddingBottom: 90,
          },
        }),
        sectionStyles: {
          ...create({
            containerStyles,
            titleStyles,
            textStyles: {
              alignSelf: "center",
              color: normal(),
              fontSize: 14,
              letterSpacing: 1,
            },
          }),
          iconStyles: {
            iconColor: normalIcon(0.4),
            containerStyles: compose(
              iconStyles({}).containerStyles,
              create({
                extra: {
                  alignSelf: "center",
                  marginBottom: 20,
                  marginTop: 10,
                },
              }).extra
            ),
          },
          infoStyles: create({
            containerStyles: {
              paddingTop: 10,
              paddingLeft: 15,
              flexDirection: "row",
              alignItems: "flex-end",
            },
            labelStyles: {
              width: "30%",
              color: normal(),
              fontSize: 14,
            },
            dataStyles: {
              color: secondary(),
              fontSize: 14,
              letterSpacing: 1,
            },
          }),
        },
      };
    }, []),
    sections: useMemo(
      () => [
        {
          id: "profile",
          info: [
            {
              id: "name",
              data: params.name,
            },
            {
              id: "email",
              data: params.email,
            },
            {
              id: "address",
              data: params.address,
            },
            {
              id: "phone",
              data: params.phone,
            },
          ],
        },
        {
          id: "stored",
          alert: "No item stored!",
          size: 26,
          SVG: useSuitcaseSVG,
        },
        {
          id: "collected",
          alert: "No item collected!",
          size: 40,
          SVG: useTruckSVG,
        },
      ],
      [params]
    ),
    getWidth: useCallback((percent) => getDimensions(percent).width, []),
    getCapitalised,
    onNavigate: useCallback(
      (routeParams) => navigate("Info", routeParams),
      [navigate]
    ),
    Text,
    View,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
  };
}
