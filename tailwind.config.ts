import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#FFFFFF',
				main: '#235696',
				secondary: '#F5F5F5',
				menuColor: '#e6f0fb',
				error: '#FF0000',
				cardBg: 'rgba(255,255,255, 0.65)',
				buttonLogin: '#3366FF',
				titleColor: '#095580',
				tableHeader: '#005c8e',
				teksBlack: '#0A0A0A',
				teksNatural: '#757575',
				teksNavi: '#101840',
				teksPrimary: '#22356F',
				teksActive: '#235696',
				onGoing: '#008DEB',
				completed: '#27AE60',
				revision: '#D14343',
				waitingForReview: '#FFB020',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		styled: true,
		themes: [
			{
				mytheme: {
					primary: '#FAFBFF',
					secondary: '#E9F2FF',
					accent: '#00336C',
					neutral: '#3D4451',
					'base-100': '#FFFFFF',
					info: '#e6f4fd',
					teksActive: '#8C4D99',
					success: '#27AE60',
					warning: '#FEF1CF',
					error: '#FF0000',
				},
			},
			'light',
		],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		darkTheme: 'dark',
	},
	variants: {
		extend: {
			display: ['group-hover'],
		},
	},
};
export default config;
