/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        MineBgColor: "#001321",
        ButtonShutdown: "#FF6666",
        PowerOn: "#009844",
      },
    },
  },
  plugins: [require("daisyui")],
};
