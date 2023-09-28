import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        Secondary: "#CA2446",
        Background: "#0E0D0C",
        GreyDark: "#1E1E1E",
        GreyLight: "#636363",
      },
      fontFamily: {
        roboto: ["Roboto", "sans"],
      },
      fontSize: {
        xxs: ".5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        ml: "810px",
        lg: "1024px",
        sml: "1100px",
        xl: "1280px",
        mxl: "1400px",
        xs: "560px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
export default config;

//570
