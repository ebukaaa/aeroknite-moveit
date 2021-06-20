const backgroundColor = "#951619";

export default {
  name: "moveit",
  description: "Aeroknite Moveit App",
  slug: "moveit",
  version: "2.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor,
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor,
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};
