import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        easy: "hsl(var(--easy))",
        medium: "hsl(var(--medium))",
        hard: "hsl(var(--hard))",
        syntax: {
          keyword: "hsl(var(--syntax-keyword))",
          string: "hsl(var(--syntax-string))",
          number: "hsl(var(--syntax-number))",
          function: "hsl(var(--syntax-function))",
          comment: "hsl(var(--syntax-comment))",
          variable: "hsl(var(--syntax-variable))",
        },
        // Track-specific colors
        python: "hsl(var(--python-color))",
        javascript: "hsl(var(--javascript-color))",
        java: "hsl(var(--java-color))",
        cpp: "hsl(var(--cpp-color))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(45 100% 51% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(45 100% 51% / 0.5)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, hsl(45 100% 51%) 0%, hsl(38 92% 60%) 100%)",
        "gradient-accent": "linear-gradient(135deg, hsl(270 91% 65%) 0%, hsl(330 80% 60%) 100%)",
        "gradient-dark": "linear-gradient(180deg, hsl(225 33% 10%) 0%, hsl(225 33% 7%) 100%)",
        "gradient-radial": "radial-gradient(ellipse at center, hsl(45 100% 51% / 0.15) 0%, transparent 70%)",
        "gradient-python": "linear-gradient(135deg, hsl(142 70% 50%) 0%, hsl(150 70% 40%) 100%)",
        "gradient-javascript": "linear-gradient(135deg, hsl(45 100% 51%) 0%, hsl(38 92% 50%) 100%)",
        "gradient-java": "linear-gradient(135deg, hsl(15 85% 55%) 0%, hsl(5 80% 50%) 100%)",
        "gradient-cpp": "linear-gradient(135deg, hsl(210 90% 55%) 0%, hsl(220 80% 50%) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px hsl(45 100% 51% / 0.2)",
        "glow-lg": "0 0 60px hsl(45 100% 51% / 0.3)",
        brutal: "4px 4px 0px hsl(225 33% 3%)",
        "brutal-hover": "6px 6px 0px hsl(225 33% 3%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;