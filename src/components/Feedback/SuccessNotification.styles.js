import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  notif: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    padding: '40px 72px',
    background: theme.colors.black[0],
    boxShadow: '0px 4px 20px 4px rgba(23, 23, 23, 0.6)',
    borderRadius: '12px',
    textAlign: 'center',
  },

  btn: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  icon: {
    marginBottom: 12,
  },

  title: {
    marginBottom: 8,
    textTransform: 'uppercase',
  },
}));

export default useStyles;
