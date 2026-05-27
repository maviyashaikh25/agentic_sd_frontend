/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "surface-variant": "#32353c",
        "on-secondary-fixed": "#2c0051",
        "primary-fixed": "#d8e2ff",
        "inverse-surface": "#e1e2ec",
        "secondary-container": "#6f00be",
        "secondary-fixed": "#f0dbff",
        "surface-container": "#1d2027",
        "inverse-primary": "#005ac2",
        "surface-bright": "#363941",
        "on-error-container": "#ffdad6",
        "on-secondary-container": "#d6a9ff",
        "surface-container-high": "#272a31",
        "on-tertiary": "#502400",
        "background": "#10131a",
        "tertiary-fixed-dim": "#ffb786",
        "on-surface-variant": "#c2c6d6",
        "error": "#ffb4ab",
        "surface-container-low": "#191b23",
        "surface-container-highest": "#32353c",
        "surface": "#10131a",
        "on-tertiary-fixed": "#311400",
        "primary-fixed-dim": "#adc6ff",
        "on-primary-fixed-variant": "#004395",
        "on-primary-container": "#00285d",
        "surface-dim": "#10131a",
        "secondary": "#ddb7ff",
        "on-tertiary-fixed-variant": "#723600",
        "on-secondary": "#490080",
        "outline-variant": "#424754",
        "error-container": "#93000a",
        "on-background": "#e1e2ec",
        "outline": "#8c909f",
        "on-tertiary-container": "#461f00",
        "surface-container-lowest": "#0b0e15",
        "surface-tint": "#adc6ff",
        "inverse-on-surface": "#2e3038",
        "on-primary": "#002e6a",
        "on-error": "#690005",
        "on-primary-fixed": "#001a42",
        "tertiary-fixed": "#ffdcc6",
        "tertiary": "#ffb786",
        "tertiary-container": "#df7412",
        "primary": "#adc6ff",
        "on-secondary-fixed-variant": "#6900b3",
        "on-surface": "#e1e2ec",
        "secondary-fixed-dim": "#ddb7ff",
        "primary-container": "#4d8eff"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "sm": "8px",
        "unit": "4px",
        "xl": "48px",
        "md": "16px",
        "lg": "24px",
        "xs": "4px",
        "container-max": "1440px",
        "gutter": "20px"
      },
      "fontFamily": {
        "button-text": ["Inter"],
        "mono-label": ["Space Grotesk"],
        "heading-md": ["Inter"],
        "body-sm": ["Inter"],
        "display-lg": ["Inter"],
        "body-base": ["Inter"]
      },
      "fontSize": {
        "button-text": ["14px", { "lineHeight": "1", "letterSpacing": "0", "fontWeight": "500" }],
        "mono-label": ["12px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "heading-md": ["18px", { "lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "500" }],
        "body-sm": ["13px", { "lineHeight": "1.5", "letterSpacing": "0", "fontWeight": "400" }],
        "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.03em", "fontWeight": "700" }],
        "body-base": ["14px", { "lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400" }]
      }
    }
  }
};
