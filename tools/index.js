import { lazy, Suspense } from "react";

function load(importPath, props) {
  const Path = lazy(() => importPath);

  return (
    <Suspense fallback={null}>
      <Path {...props} />
    </Suspense>
  );
}

export const useStatusBar = () => load(import("./status-bar"));
export const useUserSVG = (props) => load(import("./svgs/user"), props);
export const useHomeSVG = (props) => load(import("./svgs/home"), props);
export const useBoxSVG = (props) => load(import("./svgs/box"), props);
export const useSuitcaseSVG = (props) => load(import("./svgs/suitcase"), props);
