import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // This includes all files inside 'src'
  ],
  theme: {
    extend: {
      colors: {
        "radix-yellow": {
          400: "#FFF394",
          600: "#F3D768",
          800: "#D5AE39",
          900: "#FFE629",
          1000: "#FFFF57",
          1100: "#F5E147",
          1200: "#F6EEB4",
        },
        "radix-gray": {
          100: "#111113",
        },
      },
      flex: {
        "6": "6 6 0%",
      },
      animation: {
        marquee: "marquee 15s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(10%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
