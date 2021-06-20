import { useStore } from "./utils";

export function useScreens() {
  const {
    tab: { Navigator, Screen },
    options: { tabBarOptions, screenOptions },
    useUser,
    useHome,
    useMap,
  } = useStore();

  return (
    <Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
      <Screen name="Home" component={useHome} />
      <Screen name="Map" component={useMap} />
      <Screen name="User" component={useUser} />
    </Navigator>
  );
}
