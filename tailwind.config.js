/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      boxShadow: {
        'offset-black': '4px 4px black'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        standard: {
          primary: '#ef4444',
          secondary: '#f59e0b',
          accent: '#c084fc',
          neutral: '#44403c',
          'base-100': '#292524',
          info: '#a5f3fc',
          success: '#4ade80',
          warning: '#fef08a',
          error: '#fda4af'
        }
      }
    ]
  }
};
