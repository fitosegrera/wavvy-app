/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		darkMode: 'class',
		extend: {
			colors: {
				primary: {
					DEFAULT: '#fc8c03',
					dark: '#ca7002',
					darker: '#7e4602',
					light: '#fdba68'
				},
				secondary: {
					DEFAULT: '#0FC2C0',
					dark: '#0b8886',
					darker: '#064e4d',
					light: '#6fdad9'
				},
				surface: {
					DEFAULT: '#023535',
					dark: '#012020',
					light: '#043a3b'
				},
				status: {
					success: '#33c6a9',
					error: {
						DEFAULT: '#ff4d4d',
						dark: '#cc0000',
						light: '#ff9999'
					},
					warning: '#f3d965',
					info: '#0984e3',
					disabled: '#6c6c6c'
				},
				on: {
					primary: {
						DEFAULT: '#19212e',
						dark: '#151b25',
						light: '#19212e'
					},
					surface: {
						DEFAULT: '#dddddd',
						dark: '#bbbbbb',
						light: '#ffffff'
					},
					status: {
						DEFAULT: '#19212e',
						success: '#ffffff',
						error: '#ffffff',
						warning: '#19212e',
						info: '#ffffff'
					}
				}
			},
			boxShadow: {
				top: '0px -4px 16px 2px rgba(0, 0, 0, 0.1)'
			}
		}
	},
	plugins: []
};
