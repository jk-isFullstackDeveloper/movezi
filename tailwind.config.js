/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              primary: "#4A90E2", // Soothing Blue
              secondary: "#00C897", // Fresh Green
              background: "#F7F9FC", // Light Grayish Blue
              darkText: "#333", // Dark Gray for readability
          },
      },
  },
  plugins: [],
};
