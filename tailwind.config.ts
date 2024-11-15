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
          pink: '#FF6EC7',  // Neon pink 
          blue: '#00FFFF',  // Neon cyan
          yellow: '#F5EA00', // Neon yellow
          orange: '#FF4F00', // Neon orange
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
            focus: '#000000',
            background: '#ffffff', // Light background
            foreground: '#000000', // Dark text
            primary: {
              DEFAULT: '#FF8C00', // Default orange
              foreground: '#ffffff',
              300: '#F4743B', // Dark orange
              400: '#0A210F', // Dark green text color
              500: '#3E3C3C', // Grey
            },
          },
        },
        dark: {
          layout: {},
          colors: {
            focus: '#D3D3D3',
            background: '#0D001A', // Dark background
            foreground: '#ffffff', // Light text
            primary: {
              DEFAULT: '#FF8C00', // Default orange
              foreground: '#ffffff',
              300: '#F4743B', // Dark orange
              500: '#D3D3D3', // Light text color
            },
          },
        },
      },
    }),
  ],
};

export default config;
