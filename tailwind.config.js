/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

const plugin = require("tailwindcss/plugin");
const Myclass = plugin(function ({ addUtilities }) {
	addUtilities({
		".my-rotate-y-180": {
			transform: "rotateY(180deg)",
			transition: "transform 0.5s ease-in-out",
		},
		".backface-hidden": {
			backfaceVisibility: "hidden",
		},
	});
});
module.exports = withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			backgroundColor: {
				color: {
					primary: "var(--background-color-primary)",
					secondary: "var(--background-color-secondary)",
					custom: "var(--background-color-custom)",
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
					headerPrimary: "var(--text-header-primary)",
					headerSecondary: "var(--text-header-secondary)",
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
	plugins: [Myclass],
});
