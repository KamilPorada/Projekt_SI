const tailwindColors = require('tailwindcss/colors')

const colors = {
	...tailwindColors,
	mainColor: '#101631',
	secondaryColor: '#14203b',
	accentColor: '#F97316',
	backgroundColor: '#d0d7e0',
}

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors,
		extend: {
			container: {
				center: true,
				padding: '2rem',
				screens: {
					sm: '100%',
					md: '100%',
					lg: '100%',
					xl: '1200px',
				},
			},
		},
		screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
		},
	},
	plugins: [],
}
