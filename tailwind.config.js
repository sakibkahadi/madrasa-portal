/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        primary: {
          DEFAULT: '#08381a', // Primary blue
          foreground: '#ffffff' // White text on primary
        },
        secondary: {
          DEFAULT: '#93b9eb', // Secondary green
          foreground: '#ffffff' // White text on secondary
        },
        accent: {
          DEFAULT: '#107336', // Accent orange
          foreground: '#ffffff' // White text on accent
        },
        text: {
          DEFAULT: '#333333', // Dark text
          light: '#4b5563', // Light gray text
          muted: '#6b7280', // Muted gray text
          inverted: '#f9fafb' // Light text for dark backgrounds
        },
        background: '#ffffff', // Light background
        border: '#bdc3c7', // Light gray border
        destructive: {
          DEFAULT: '#e74c3c', // Destructive red
          foreground: '#ffffff' // White text on destructive
        },
        ring: '#3498db', // Primary blue ring
        foreground: '#333333', // Dark text
        card: {
          DEFAULT: '#f9f9f9', // Light card background
          foreground: '#333333' // Dark text on card
        },
        popover: {
          DEFAULT: '#ffffff', // White popover background
          foreground: '#333333' // Dark text on popover
        },
        muted: {
          DEFAULT: '#ecf0f1', // Muted light gray
          foreground: '#34495e' // Dark muted text
        },
        input: '#ffffff', // White input background
        chart: {
          '1': '#3498db', // Example color for chart
          '2': '#2ecc71',
          '3': '#e67e22',
          '4': '#e74c3c',
          '5': '#9b59b6'
        }
      },
      
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
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
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
