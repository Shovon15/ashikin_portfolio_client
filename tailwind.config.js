/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: "#A2FF86",
				secondary: "#ACC8E5",
				buttonPrimary: "#164B60",
				buttonSecondary: "#fff",
				buttonDanger: "#D92728",   //color: red
				textPrimary: "#1B6B93",    //color:
				textSecondary: "#ACC8E5",
				borderPrimary: "#4FC0D0",
				borderDark: "#1D42B0",
				darkPrimary: "#0F172A",
				darkSecondary: "#1D42B0",
				darkTextPrimary: "#fff",
				darkTextSecondary: "",
			},
		},
		fontFamily: {
			sans: ["Nunito", "sans-serif"],
		},
	},
	// plugins: [require("daisyui")],
});
