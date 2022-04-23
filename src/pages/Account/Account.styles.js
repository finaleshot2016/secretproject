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

  cardStatLabel: {
    marginBottom: 4,
  },

  cardActionImage: {
    display: 'grid',
    placeItems: 'center',
    marginBottom: 20,
  },

  btn: {
    height: 52,
    background: 'transparent linear-gradient(117deg, #80808033 0%, #FFFFFF00 50%, #FFFFFF4D 100%) 0% 0% no-repeat padding-box',
    backgroundImage: 'linear-gradient(to right,  #FFFFFF1F 0%, #FFFFFF3D 40%, #9679BC 100%)',
    backgroundSize: '200% auto',
    fontSize: theme.fontSizes.md,
    textTransform: 'uppercase',
    borderRadius: 12,
    transition: theme.other.transitions.background,

    '&:hover': {
      backgroundPositionX: 'right',
      backgroundPositionY: 'center',
      backgroundColor: '#EB429F',
    },
  },

  btnGradient: {
    backgroundImage: 'linear-gradient(to right, #EB429F 0%, #9679BC 40%, #EB429F 100%)',

    '&:hover': {
      backgroundPositionX: 'right',
      backgroundPositionY: 'center',
    },
  },

  gradient4: {
    position: 'fixed',
    top: 50,
    right: 50,
    pointerEvents: 'none',
  },

  gradient5: {
    position: 'fixed',
    bottom: -370,
    left: -344,
    pointerEvents: 'none',
  },
}));

export default useStyles;
