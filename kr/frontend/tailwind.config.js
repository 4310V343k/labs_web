/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marathon-dark': '#0a0e1a',
        'marathon-darker': '#05070f',
        'marathon-gray': '#1a1f2e',
        'marathon-light': '#d1d5db',
        'faction-mida': '#C8A0DC',
        'faction-uesc': '#1E69F5',
        'faction-cyac': '#00FF00',
        'faction-nucal': '#FF0A60',
        'faction-sekgen': '#95F6C2',
        'faction-traxus': '#FF7500',
        'faction-arachne': '#FF0000',
      },
      fontFamily: {
        'mono': ['IBM Plex Mono', 'Courier New', 'monospace'],
        'sans': ['IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'marathon-gradient': 'linear-gradient(135deg, #05070f 0%, #0a0e1a 50%, #0f1219 100%)',
        'scan-pattern': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)',
      },
    },
  },
  plugins: [],
}
