import { useDashboard, Screen, Navigator } from "./utils";

export function useMap() {
  return (
    <Navigator initialRouteName="Map">
      <Screen
        name="Map"
        component={useDashboard}
        options={{ headerShown: false, stackPresentation: "modal" }}
      />
    </Navigator>
  );
}
