import {
  tabBarOptions,
  screenOptions,
  Navigator,
  Screen,
  useUser,
  useHome,
} from "./utils";

export function useScreens() {
  return (
    <Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
      <Screen name="Home" component={useHome} />
      <Screen name="User" component={useUser} />
    </Navigator>
  );
}
