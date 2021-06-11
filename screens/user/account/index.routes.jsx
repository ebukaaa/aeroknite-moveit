import {
  screenOptions,
  useDashboard,
  useInfo,
  Screen,
  Navigator,
} from "./utils";
import { useModal } from "./modal";

export function useAccount({ route: { params } }) {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen
        name="Dashboard"
        component={useDashboard}
        initialParams={params}
      />
      <Screen name="Info" component={useInfo} />
      <Screen name="Modal" component={useModal} />
    </Navigator>
  );
}
