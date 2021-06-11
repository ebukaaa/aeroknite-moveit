import "react-native-gesture-handler";
import { useStore } from "./utils";

export default function App() {
  const { StatusBar, Screens, NavigationContainer } = useStore();

  return (
    <NavigationContainer>
      <StatusBar />
      <Screens />
    </NavigationContainer>
  );
}
