import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  const logo = getRef('logo');
  const icon = getRef('icon');
  const link = getRef('link');
  const header = getRef('header');
  const desktopBurger = getRef('desktopBurger');

  return {
    nav: {
      position: 'sticky',
      top: 0,
      zIndex: 9999,
      width: '320px !important',
      maxWidth: '320px !important',
      minWidth: '0 !important',
      padding: '2.5rem !important',
      background: 'transparent linear-gradient(163deg, #80808033 0%, #FFFFFF00 50%, #FFFFFF4D 100%) 0% 0% no-repeat padding-box',
      backdropFilter: 'blur(12px)',
      border: '1px solid #C2C2C233',
      height: '100vh',
      transition: 'max-width 500ms ease',
    },

    navClosed: {
      maxWidth: '144px !important',
      transition: 'max-width 500ms ease',

      [`& .${header}`]: {
        flex: 'none',
        width: 30,
        height: 54,
      },

      [`& .${logo}`]: {
        display: 'none',
      },

      [`& .${desktopBurger}`]: {
        right: -20,
        transition: 'right 500ms ease',
      },

      [`& .${icon}`]: {
        marginRight: 0,
        transition: 'margin 500ms ease',
      },
    },

    header: {
      ref: header,
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 40,
    },

    logo: {
      ref: logo,
    },

    desktopBurger: {
      ref: desktopBurger,
      position: 'absolute',
      top: 0,
      right: -24,
      padding: '0 !important',
      transition: 'right 500ms ease',
    },

    link: {
      ref: link,
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'center',
      padding: '0.5rem 0.75rem',
      width: '100%',
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: theme.colors.white[0],
      fontWeight: 400,
      transition: theme.other.transitions.color,

      '&:hover': {
        borderRadius: 8,
        background: '#FFFFFF1A 0% 0% no-repeat padding-box',
        textDecoration: 'none',
      },

      [theme.fn.smallerThan('md')]: {
        paddingLeft: 20,
      },
    },

    linkIcon: {
      ref: icon,
      marginRight: 20,
    },

    linkLabel: {
      position: 'absolute',
      left: 70,
    },

    linkActive: {
      '&, &:hover': {
        borderRadius: 8,
        background: '#FFFFFF1A 0% 0% no-repeat padding-box',
      },
    },

    popover: {
      position: 'absolute',
      top: '50%',
      right: -160,
      transform: 'translateY(-50%)',
      background: theme.colors.white[0],
      color: theme.colors.black[0],
      padding: '8px 12px',
      zIndex: 99999,

      '&:before': {
        position: 'absolute',
        top: '50%',
        left: -8,
        transform: 'translateY(-50%)',
        content: `''`,
        width: 0,
        height: 0,
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderRight: '8px solid white',
      },
    },

    mobileNav: {
      zIndex: 9999,
      height: 97.19,
      maxHeight: 97.19,
      minHeight: '0 !important',
      padding: '1.5rem 0 2.5rem 0',
      background: '#FFFFFF1A 0% 0% no-repeat padding-box',
      backdropFilter: 'blur(12px)',
      border: '2px solid rgba(194, 194, 194, .2)',
      borderRadius: '0px 0px 12px 12px',
      transition: 'height 800ms ease, max-height 800ms ease',
    },

    mobileNavOpened: {
      height: 440,
      maxHeight: 440,
      border: '2px solid #C2C2C233',
      borderRadius: '0px 0px 28px 28px',
      transition: 'max-height 800ms ease',
    },

    mobileHeader: {
      position: 'relative',
      zIndex: 999,
      display: 'flex',
      justifyContent: 'space-between',

      '@media (max-height: 656px)': {
        padding: '0 2.5rem',
      },

      [theme.fn.smallerThan('md')]: {
        padding: '0 2.5rem',
      },

      [theme.fn.smallerThan('sm')]: {
        padding: '0 1.5rem',
      },
    },

    mobileMenu: {
      position: 'relative',
      zIndex: 9999,
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px 40px',
      width: '100%',

      '@media (max-height: 656px)': {
        padding: '2.5rem 2.5rem 0 2.5rem',
      },

      [theme.fn.smallerThan('md')]: {
        padding: '2.5rem 2.5rem 0 2.5rem',
      },

      [theme.fn.smallerThan('sm')]: {
        padding: '2.5rem 1.5rem 0 1.5rem',
      },
    },
  };
});

export default useStyles;
