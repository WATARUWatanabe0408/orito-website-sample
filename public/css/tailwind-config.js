// 共通 Tailwind カスタムカラー設定
// CDN スクリプトより前に読み込むこと
window.tailwind = window.tailwind || {};
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary":                    "#0f6765",
        "primary-container":          "#33807e",
        "on-primary":                 "#ffffff",
        "on-primary-container":       "#f3fffe",
        "primary-fixed":              "#a5f0ed",
        "primary-fixed-dim":          "#89d3d1",
        "on-primary-fixed":           "#00201f",
        "on-primary-fixed-variant":   "#00504e",
        "secondary":                  "#006d40",
        "secondary-container":        "#6ef9ac",
        "on-secondary":               "#ffffff",
        "on-secondary-container":     "#007243",
        "secondary-fixed":            "#71fcae",
        "secondary-fixed-dim":        "#51df94",
        "on-secondary-fixed":         "#002110",
        "on-secondary-fixed-variant": "#00522f",
        "tertiary":                   "#5d5c5b",
        "tertiary-container":         "#757474",
        "on-tertiary":                "#ffffff",
        "on-tertiary-container":      "#fffcfb",
        "tertiary-fixed":             "#e5e2e1",
        "tertiary-fixed-dim":         "#c8c6c5",
        "on-tertiary-fixed":          "#1b1b1b",
        "on-tertiary-fixed-variant":  "#474746",
        "surface":                    "#f6fcfb",
        "surface-dim":                "#bddbd8",
        "surface-bright":             "#f0faf8",
        "surface-container-lowest":   "#f6fcfb",
        "surface-container-low":      "#d9edea",
        "surface-container":          "#cee8e5",
        "surface-container-high":     "#c3e3e0",
        "surface-container-highest":  "#b8dedb",
        "surface-variant":            "#cee8e5",
        "on-surface":                 "#1a1c1c",
        "on-surface-variant":         "#3f4948",
        "background":                 "#f6fcfb",
        "on-background":              "#1a1c1c",
        "outline":                    "#6f7978",
        "outline-variant":            "#bec9c7",
        "inverse-surface":            "#2f3131",
        "inverse-on-surface":         "#f1f1f1",
        "inverse-primary":            "#89d3d1",
        "surface-tint":               "#146967",
        "error":                      "#ba1a1a",
        "error-container":            "#ffdad6",
        "on-error":                   "#ffffff",
        "on-error-container":         "#93000a"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg":      "0.5rem",
        "xl":      "0.75rem",
        "full":    "9999px"
      },
      fontFamily: {
        "headline": ["Noto Sans JP", "sans-serif"],
        "body":     ["Noto Sans JP", "sans-serif"],
        "label":    ["Noto Sans JP", "sans-serif"]
      }
    }
  }
};
