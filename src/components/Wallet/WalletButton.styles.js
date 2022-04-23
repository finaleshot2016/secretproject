import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  btn: {
    height: 52,
    backgroundImage: 'linear-gradient(to right, #fff712 0%, #bcb179 40%, #ffaa00 100%)',
    backgroundSize: '200% auto',
    fontSize: theme.fontSizes.md,
    textTransform: 'uppercase',
    borderRadius: 12,
    transition: theme.other.transitions.background,

    '&:hover': {
      backgroundPositionX: 'right',
      backgroundPositionY: 'center',
    },
  },
}));

export default useStyles;
