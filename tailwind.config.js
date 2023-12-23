/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			backgroundColor: {
				color: {
					primary: "var(--background-color)",
					secondary: "var(--background-color-secondary)",
					button: "var(--button-color)",
					buttonHover: "var(--button-hover-color)",
				},
			},
			ringColor: {
				color: {
					buttonRing: "var(--button-hover-ring)",
				},
			},
			borderColor: {
				color: {
					border: "var( --border-color)",
				},
			},

			textColor: {
				color: {
					header: "var(--text-header-color)",
					text: "var(--text-color)",
				},
			},

			// colors: {
			// 	// secondary is for dark mode-------------
			// 	// #0F192F
			// 	bgPrimary: "#FFFFFF",
			// 	bgSecondary: "#0F172A",

			// 	buttonPrimary: "#1565C0",
			// 	buttonHover: "#42A5F5",
			// 	buttonActive: "#1E53D9",
			// 	buttonSecondary: "",

			// 	textPrimary: "#1565C0", //color: blue-500
			// 	textSecondary: "#808080",

			// 	borderPrimary: "#1565C0",
			// 	borderSecondary: "#2196F3", //blue
			// },
		},
		fontFamily: {
			sans: ["Nunito", "sans-serif"],
		},
	},
	// plugins: [require("daisyui")],
});
