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
					primary: "var(--background-color-primary)",
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
					primary: "var(--text-color-primary)",
					secondary: "var(--text-color-secondary)",
				},
			},
		},
		fontFamily: {
			sans: ["Nunito", "sans-serif"],
		},
	},
	plugins: [],
});
