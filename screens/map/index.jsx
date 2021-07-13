import { useStore } from "./utils";

export function useMap() {
  const {
    stack: { Navigator, Screen },
    screenOptions,
    useLocations,
    useStorage,
    Sheet,
    Layout,
    Map,
  } = useStore();

  return (
    <Layout>
      <Map />

      <Sheet>
        <Navigator screenOptions={screenOptions}>
          <Screen name="Locations" component={useLocations} />
          <Screen name="Storage" component={useStorage} />
        </Navigator>
      </Sheet>
    </Layout>
  );
}
