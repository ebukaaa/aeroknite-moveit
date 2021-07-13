import { memo, useCallback, useLayoutEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSearchSVG as SearchSVG } from "tools";
import colors from "tools/styles/colors";
import cardStyles from "tools/styles/card";
import { AntDesign } from "@expo/vector-icons";

export function useStore({ storages }) {
  const { navigate, setOptions } = useNavigation();
  const { create, compose } = useMemo(() => StyleSheet, []);

  useLayoutEffect(() => {
    const Search = memo(() => {
      useMemo(() => {
        Search.displayName = "Search";
      }, []);

      const searchStyles = useMemo(
        () =>
          create({
            containerStyles: {
              paddingVertical: 6,
              backgroundColor: colors.background.other(),
              borderRadius: 200,
              flexDirection: "row",
              width: "94%",
              overflow: "hidden",
            },
          }).containerStyles,
        []
      );
      const iconStyles = useMemo(
        () =>
          create({
            style: {
              marginLeft: 15,
              shadowOpacity: 0.2,
              shadowRadius: 0.8,
              shadowOffset: {
                width: -2,
                height: 1,
              },
            },
          }).style,
        []
      );
      const inputStyles = useMemo(
        () =>
          create({
            inputStyles: {
              paddingLeft: 8,
              flex: 1,
            },
          }).inputStyles,
        []
      );

      return (
        <View style={searchStyles}>
          <SearchSVG size={20} style={iconStyles} />

          <TextInput style={inputStyles} placeholder="Search Storages" />
        </View>
      );
    });

    setOptions({
      headerCenter() {
        return <Search />;
      },
    });
  }, [setOptions, create]);

  return {
    styles: useMemo(() => {
      const {
        containerStyles: cardContainerStyles,
        titleStyles: cardTitleStyles,
      } = cardStyles;
      const {
        background: { accent: backgroundAccent },
        text: { accent: textAccent },
      } = colors;

      return {
        ...create({
          appStyles: {
            paddingBottom: 90,
          },
        }),
        locationStyles: {
          ...create({
            textStyles: {
              color: textAccent(),
            },
            separatorStyles: {
              backgroundColor: "#937171",
              height: "100%",
              width: 2,
              borderRadius: 20,
            },
          }),
          infoStyles: {
            titleStyles: cardTitleStyles,
            ...create({
              containerStyles: {
                flex: 1,
                paddingRight: 10,
              },
            }),
            footerStyles: {
              ...create({
                containerStyles: {
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                },
                timeStyles: {
                  color: textAccent(),
                  paddingVertical: 5,
                  fontWeight: "bold",
                  fontSize: 10,
                },
              }),
              ratingStyles: {
                tintColor: textAccent(),
                ...create({
                  containerStyles: {
                    flexDirection: "row",
                  },
                }),
              },
            },
          },
          containerStyles: compose(
            cardContainerStyles,
            create({
              style: {
                backgroundColor: backgroundAccent(),
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 16,
                shadowOpacity: 0.3,
              },
            }).style
          ),
        },
      };
    }, [create, compose]),
    stars: useMemo(() => [...Array(5)], []),
    stores: useMemo(
      () =>
        storages.flatMap(({ name, about, email, location }) =>
          location[0].places.map(({ postcode, street, phone, time, city }) => ({
            id: name + postcode,
            name,
            about,
            email,
            postcode,
            street,
            phone,
            time,
            city,
          }))
        ),
      [storages]
    ),
    onNavigate: useCallback((props) => navigate("Storage", props), [navigate]),
    View,
    Text,
    FlatList,
    AntDesign,
    SafeAreaView,
    TouchableOpacity,
  };
}
