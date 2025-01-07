import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate"

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
		animation: {
			spotlight: "spotlight 2s ease .75s 1 forwards",
		},
		keyframes: {
			spotlight: {
				"0%": {
					opacity: "0",
					transform: "translate(-72%, -62%) scale(0.5)",
				},
				"100%": {
					opacity: "1",
					transform: "translate(-50%,-40%) scale(1)",
				},
			},
		},
  },
  plugins: [animate],
};
export default config;
