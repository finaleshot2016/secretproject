import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  row: {
    position: 'relative',
    zIndex: 999,

    '&:not(:last-child)': {
      marginBottom: 40,
    },
  },

  cardStat: {
    display: 'flex',
    alignItems: 'center',
  },

  cardStatIcon: {
    marginRight: 20,
  },

  cardStatTitle: {
    marginBottom: 8,
    textTransform: 'uppercase',
  },

  chart: {
    height: 600,
  },

  dex: {
    width: '100%',
    height: '100%',
  },

  gradient1: {
    position: 'fixed',
    top: -518,
    left: -462,
    pointerEvents: 'none',
  },

  gradient2: {
    position: 'fixed',
    top: 127,
    left: 160,
    pointerEvents: 'none',
  },

  gradient3: {
    position: 'fixed',
    bottom: -580,
    right: -500,
    width: '80%',
    pointerEvents: 'none',
  },
}));

export default useStyles;
