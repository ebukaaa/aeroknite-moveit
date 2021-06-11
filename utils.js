import { useLayoutEffect } from "react";
import { auth, db } from "tools/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { useStatusBar } from "tools";
import { useScreens } from "./screens/index.routes";
import { login } from "./screens/user/utils";

export function useStore() {
  useLayoutEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (!user) {
        login(null);
        return;
      }
      const { uid: id } = user;
      const currentUser = db.collection("users").doc(id);
      const info = await currentUser.get();
      login(info.data());
    });
    return unsubscribe;
  }, []);

  return {
    StatusBar: useStatusBar,
    Screens: useScreens,
    NavigationContainer,
  };
}
