import type { Config } from "tailwindcss";

/**
 * Tokens are lifted verbatim from the `tailwind.config` block embedded in the
 * Stitch exports (.stitch/designs/*.html). That export is the authoritative
 * source: it is what the generated screens actually render with.
 *
 * Two additions, both documented in README.md:
 *  - `status-*` colors. Stitch's Material palette has `error` but no success or
 *    warning tone, and a parcel product cannot express "held at customs"
 *    without one. All three are contrast-checked against white.
 *  - `on-dark-*`. Stitch's `primary` (#003ec7) fails contrast on the dark
 *    inverse-surface sections, so links there need a lighter tint.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "inverse-on-surface": "#ecf1ff",
        background: "#f9f9ff",
        "primary-container": "#0052ff",
        "on-secondary-container": "#5c647c",
        "on-secondary-fixed": "#131b2f",
        "tertiary-container": "#00736c",
        "surface-bright": "#f9f9ff",
        "on-tertiary-container": "#5afdf0",
        tertiary: "#005853",
        "surface-container-low": "#f0f3ff",
        "on-error": "#ffffff",
        "surface-tint": "#004ced",
        "on-tertiary-fixed-variant": "#00504b",
        "inverse-primary": "#b7c4ff",
        "secondary-fixed": "#dae2fe",
        outline: "#737688",
        "on-secondary-fixed-variant": "#3f465d",
        "surface-container": "#e7eeff",
        "outline-variant": "#c3c5d9",
        "on-secondary": "#ffffff",
        "on-tertiary": "#ffffff",
        secondary: "#565e75",
        "secondary-fixed-dim": "#bec6e1",
        "on-primary-fixed-variant": "#0038b6",
        "on-primary-fixed": "#001452",
        "primary-fixed-dim": "#b7c4ff",
        "on-surface": "#111c2d",
        "on-surface-variant": "#434656",
        "on-primary": "#ffffff",
        "error-container": "#ffdad6",
        "on-background": "#111c2d",
        "inverse-surface": "#263143",
        "tertiary-fixed-dim": "#28ddd1",
        "primary-fixed": "#dde1ff",
        "surface-container-high": "#dee8ff",
        "on-error-container": "#93000a",
        error: "#ba1a1a",
        "on-primary-container": "#dfe3ff",
        surface: "#f9f9ff",
        "surface-container-highest": "#d8e3fb",
        "surface-variant": "#d8e3fb",
        "on-tertiary-fixed": "#00201e",
        "surface-dim": "#cfdaf2",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed": "#56faed",
        primary: "#003ec7",
        "secondary-container": "#dae2fe",

        // --- additions (see note above) ---
        "control-border": "#7e8899",
        "status-cleared": "#046c47",
        "status-cleared-bg": "#e2f6ed",
        "status-transit": "#003ec7",
        "status-transit-bg": "#e4ecff",
        "status-held": "#8a4b00",
        "status-held-bg": "#fdf0dd",
        "status-exception": "#ba1a1a",
        "status-exception-bg": "#ffdad6",
        "on-dark-primary": "#a8c0ff",
        "on-dark-muted": "#c3c5d9",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "stack-xl": "64px",
        "stack-lg": "32px",
        "container-max": "1280px",
        base: "8px",
        "stack-sm": "8px",
        "margin-mobile": "16px",
        "stack-xs": "4px",
        "margin-desktop": "40px",
        "stack-md": "16px",
        gutter: "24px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      fontFamily: {
        "headline-md": ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "headline-sm": ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "display-lg": ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "label-md": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        "body-sm": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        "body-md": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        "body-lg": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        "data-tabular": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "800" }],
        "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "800" }],
        "headline-sm": ["20px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "data-tabular": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
      },
    },
  },
  plugins: [],
};

export default config;
