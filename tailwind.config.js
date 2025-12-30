/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050509",
        "background-alt": "#0b0b0f",
        accent: "#ff2e2e",
        "accent-soft": "rgba(255,46,46,0.2)"
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        display: ["Poppins", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "accent-glow": "0 0 25px rgba(255,46,46,0.35)"
      }
    }
  },
  plugins: []
};

