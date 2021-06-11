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
import card from "tools/styles/card";
import { getCapitalised } from "tools/capitalise";
import colors from "tools/styles/colors";
import { auth } from "tools/firebase";
import { getDimensions } from "tools/dimensions";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { string } from "prop-types";

export function useStore() {
  const { setOptions, navigate, replace } = useNavigation();
  const { params } = useRoute();

  useLayoutEffect(() => {
    const Logout = memo(({ tintColor }) => (
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
    Logout.propTypes = {
      tintColor: string.isRequired,
    };

    const Delete = memo(({ tintColor }) => (
      <TouchableOpacity onPress={() => {}}>
        <AntDesign name="deleteuser" color={tintColor} size={20} />
      </TouchableOpacity>
    ));
    Delete.displayName = "Delete";
    Delete.propTypes = {
      tintColor: string.isRequired,
    };

    setOptions({
      headerLeft(props) {
        return <Logout {...props} />;
      },
      headerRight(props) {
        return <Delete {...props} />;
      },
    });
  }, [setOptions, replace, params.email]);

  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;
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
            ...create({
              containerStyles: {
                alignSelf: "center",
              },
            }),
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
          icon: "luggage",
          SVG: MaterialIcons,
        },
        {
          id: "collected",
          alert: "No item collected!",
          icon: "truck-delivery",
          SVG: MaterialCommunityIcons,
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
