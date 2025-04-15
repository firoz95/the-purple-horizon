
import type { Config } from "tailwindcss";

export default {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: "#FFFFFF",
        foreground: '#111827',
        primary: {
          DEFAULT: '#4B2E83',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#F8FAFC',
          foreground: '#1F2937'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#F8FAFC',
          foreground: '#64748B'
        },
        accent: {
          DEFAULT: "#4B2E83",
          hover: "#3a2266"
        },
        text: {
          primary: "#111827",
          secondary: "#64748B"
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827"
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'dashboard': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
