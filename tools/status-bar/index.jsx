import { useStore } from "./utils";

export function useStatusBar() {
  const { style, StatusBar } = useStore();

  return <StatusBar style={style} />;
}
export default useStatusBar;
