const theme = {
  colors: {
    white: ['#FFFFFF'],
    black: ['#110D17'],
  },

  fontFamily: 'Montserrat, sans-serif',

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },

  lineHeight: 1.5,

  headings: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    sizes: {
      h1: { fontSize: 64, lineHeight: 1.375 },
      h2: { fontSize: 32, lineHeight: 1.25 },
      h3: { fontSize: 28, lineHeight: 1.357 },
      h4: { fontSize: 24, lineHeight: 1.166 },
      h5: { fontSize: 20, lineHeight: 1.4 },
      h6: { fontSize: 16, lineHeight: 1.5 },
    },
  },

  breakpoints: {
    xs: 500,
    sm: 768,
    md: 1024,
    lg: 1366,
    xl: 1720,
  },

  other: {
    transitions: {
      all: 'all 200ms ease',
      color: 'color 200ms ease',
      border: 'border 200ms ease',
      background: 'background 500ms ease',
      stroke: 'stroke 200ms ease',
      fill: 'fill 200ms ease',
      stopColor: 'stop-color 200ms ease',
      boxShadow: 'box-shadow 200ms ease',
    },
  },
};

export default theme;
