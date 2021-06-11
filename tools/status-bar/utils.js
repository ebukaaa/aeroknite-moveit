import { useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";

let putStyle;

export function useStore() {
  const [style, setStyle] = useState("light");
  useMemo(() => (putStyle = setStyle), []);

  return { style, StatusBar };
}
export function useProps() {
  return {
    putStyle,
  };
}
