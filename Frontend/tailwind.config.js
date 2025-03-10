// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [
      function({ addComponents }) {
        addComponents({
          '.custom-scrollbar::-webkit-scrollbar': {
            width: '8px',
          },
          '.custom-scrollbar::-webkit-scrollbar-track': {
            background: '#f1f5f9',
            borderRadius: '0 0 8px 0',
          },
          '.custom-scrollbar::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px',
          },
          '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
            background: '#2563eb',
          },
          '.custom-scrollbar': {
            scrollbarWidth: 'thin',
            scrollbarColor: '#c1c1c1 #f1f5f9',
          },
        })
      }
    ]
  }