const global = (theme) => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    overflowX: 'hidden',
    backgroundColor: theme.colors.black[0],
    color: theme.colors.white[0],
    fontFamily: theme.fontFamily,
  },
});

export default global;
