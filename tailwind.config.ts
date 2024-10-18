import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#39FF14', // Bright neon green
          pink: '#FF6EC7',  // Neon pink (still in light theme if needed)
          blue: '#00FFFF',  // Neon cyan
          yellow: '#F5EA00', // Neon yellow
          orange: '#FF4F00', // Neon orange (for dark theme)
          purple: '#BF00FF', // Neon purple
          red: '#FF003F',    // Neon red
        },
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            background: '#ffffff', // Light background
            foreground: '#000000', // Dark text
            primary: {
              DEFAULT: '#FF8C00', // Default orange
              foreground: '#ffffff',
              300: '#F4743B', // dark orange
              400: '#0A210F', // Dark green text color
            },
          },
        },
        dark: {
          layout: {},
          colors: {
            background: '#0D001A', // Dark background
            foreground: '#ffffff', // Light text
            primary: {
              DEFAULT: '#ACECF7', // Light neon blue
              300: '49B6FF', //other blue
              foreground: '#ffffff', // Light text color
            },
          },
        },
        modern: {
          extend: 'dark',
          colors: {
            background: '#0D001A', // Dark background for modern theme
            foreground: '#000000', // dark text color
            primary: {
              DEFAULT: '#000000', // Default neon orange (bright)
              300: '#E1E289', // yellow 
              foreground: '#ffffff', // Light text color
            },
            focus: '#FF8C00', // Darker neon orange
          },
        },
      },
    }),
  ],
};

export default config;
