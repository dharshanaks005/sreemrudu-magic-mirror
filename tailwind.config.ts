import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Magic Mirror colors
				'mirror-frame': 'hsl(var(--mirror-frame))',
				'mirror-glass': 'hsl(var(--mirror-glass))',
				'magic-sparkle': 'hsl(var(--magic-sparkle))',
				'rose-petal': 'hsl(var(--rose-petal))',
				'troll-red': 'hsl(var(--troll-red))',
				'mass-meter-low': 'hsl(var(--mass-meter-low))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-magic': 'var(--gradient-magic)',
				'gradient-mirror': 'var(--gradient-mirror)',
				'gradient-sreemrudu': 'var(--gradient-sreemrudu)',
				'gradient-troll': 'var(--gradient-troll)'
			},
			boxShadow: {
				'magical': 'var(--shadow-magical)',
				'mirror': 'var(--shadow-mirror)',
				'glow': 'var(--shadow-glow)',
				'troll': 'var(--shadow-troll)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'magical-glow': {
					'0%': { 
						filter: 'brightness(1) drop-shadow(0 0 20px hsl(280 100% 70% / 0.8))'
					},
					'100%': { 
						filter: 'brightness(1.3) drop-shadow(0 0 40px hsl(280 100% 85% / 1))'
					}
				},
				'troll-shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-2px) rotate(-1deg)' },
					'75%': { transform: 'translateX(2px) rotate(1deg)' }
				},
				'float-down': {
					'0%': {
						transform: 'translateY(-20px) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh) rotate(360deg)',
						opacity: '0'
					}
				},
				'sparkle': {
					'0%, 100%': {
						opacity: '0',
						transform: 'scale(0.5)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'screen-static': {
					'0%': { filter: 'hue-rotate(0deg) contrast(1)' },
					'25%': { filter: 'hue-rotate(90deg) contrast(1.5)' },
					'50%': { filter: 'hue-rotate(180deg) contrast(0.8)' },
					'75%': { filter: 'hue-rotate(270deg) contrast(1.2)' },
					'100%': { filter: 'hue-rotate(360deg) contrast(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'magical-glow': 'magical-glow 2s ease-in-out infinite alternate',
				'troll-shake': 'troll-shake 0.3s ease-in-out infinite',
				'float-down': 'float-down 4s linear infinite',
				'sparkle': 'sparkle 1.5s ease-in-out infinite',
				'screen-static': 'screen-static 0.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
