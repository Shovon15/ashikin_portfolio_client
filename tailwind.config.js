/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// secondary is for dark mode-------------
				bgPrimary: "#FFFFFF",
				bgSecondary: "#0F172A",

				buttonPrimary: "#1565C0",
				buttonHover: "#42A5F5",
				buttonActive: "#1E53D9",
				buttonSecondary: "",

				textPrimary: "#1565C0", //color: blue-500
				textSecondary: "#808080",

				borderPrimary: "#1565C0",
				borderSecondary: "#2196F3", //blue

			},
		},
		fontFamily: {
			sans: ["Nunito", "sans-serif"],
		},
	},
	// plugins: [require("daisyui")],
});
