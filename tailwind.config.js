/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),require('tailwind-scrollbar-hide')],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#570DF8",

          "secondary": "#F000B8",

          "accent": "#86efac",

          "neutral": "#3D4451",

          "base-100": "#FFFFFF",

          "info": "#3ABFF8",

          "success": "#3c9c4c",

          "warning": "#FBBD23",

          "error": "#F87272", // green #86efac
        },
      },
    ],
  },
}
