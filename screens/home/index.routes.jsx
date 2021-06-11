import { useStore } from "./utils";

export function useHome() {
  const {
    stack: { Navigator, Screen },
    screenOptions,
    useDashboard,
    useDetail,
    useQuotes,
  } = useStore();

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Dashboard" component={useDashboard} />
      <Screen name="Detail" component={useDetail} />
      <Screen name="Quotes" component={useQuotes} />
    </Navigator>
  );
}
