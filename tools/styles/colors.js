export function getColor(a = 1, rgb = "0,0,0") {
  return `rgba(${rgb},${a})`;
}

export default {
  background: {
    accent(opacity) {
      return getColor(opacity, "109,28,25");
    },
    normal(opacity) {
      return getColor(opacity, "149,22,25");
    },
    secondary(opacity) {
      return getColor(opacity, "197,92,54");
    },
    primary(opacity) {
      return getColor(opacity, "162,105,12");
    },
    other(opacity) {
      return getColor(opacity, "147,113,113");
    },
  },
  text: {
    accent(opacity) {
      return getColor(opacity, "216,166,87");
    },
    normal(opacity) {
      return getColor(opacity, "199,92,47");
    },
    primary(opacity) {
      return getColor(opacity, "137,36,32");
    },
    secondary(opacity) {
      return getColor(opacity, "212,163,86");
    },
  },
  icon: {
    normal(opacity) {
      return getColor(opacity, "181,85,22");
    },
  },
  button: {
    normal(opacity) {
      return getColor(opacity, "137,36,32");
    },
  },
};
