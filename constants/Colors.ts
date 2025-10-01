const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

// defined several global colors
export const Colors = {
  capioPrimary: "#0e3050",
  white: "#fff",
  gray: "#808080",
  border: "#d3d3d3",
  textLight: "#f5f5f5",
}

export type ColorKey = keyof typeof Colors;