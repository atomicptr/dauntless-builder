/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{svelte,ts,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

