import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  connected: {
    display: 'inline-flex',
  },

  connectedMessage: {
    marginRight: 8,
    color: theme.colors.white[0],
  },
}));

export default useStyles;
