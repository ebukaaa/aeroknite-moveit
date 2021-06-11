import { useStore } from "./utils";

export function useUser() {
  const {
    user,
    stack: { Screen, Navigator },
    screenOptions,
    useAuth,
    useAccount,
  } = useStore();

  return (
    <Navigator
      screenOptions={screenOptions}
      initialRouteName={user ? "Account" : "Auth"}
    >
      <Screen name="Account" component={useAccount} initialParams={user} />
      <Screen name="Auth" component={useAuth} />
    </Navigator>
  );
}
