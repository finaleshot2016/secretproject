import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar as Nav, Group, Anchor, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactComponent as Logo } from '../../assets/moon-miner-hub.svg';
import { ReactComponent as Home } from '../../assets/nav-home.svg';
import { ReactComponent as Dashboard } from '../../assets/nav-dashboard.svg';
import { ReactComponent as Account } from '../../assets/nav-account.svg';
import { ReactComponent as Chart } from '../../assets/nav-chart.svg';

import { ReactComponent as Swap } from '../../assets/nav-swap.svg';
import { ReactComponent as Whitepaper } from '../../assets/nav-whitepaper.svg';
import toCapitalize from '../../utils/toCapitalize';
import useStyles from './Navbar.styles';

const menu = [
  { icon: Home, label: 'Home', link: '/', isExternal: true },
  { icon: Dashboard, label: 'Dashboard', link: '/dashboard' },
  { icon: Account, label: 'Account', link: '/account' },
  { icon: Chart, label: 'Chart', link: 'https://dexscreener.com/bsc/0x2f3899ffb9fdcf635132f7bb94c1a3a0f906cc6f', isExternal: true },
  { icon: Swap, label: 'Swap', link: 'https://exchange.biswap.org/#/swap?outputCurrency=0x1ce0c2827e2ef14d5c4f29a091d735a204794041', isExternal: true },
  { icon: Whitepaper, label: 'Whitepaper', link: '/', isExternal: true },
];

const linkVariant = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
      delay: 0.06,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
      delay: 0.1,
    },
  },
};

const mobileLinkVariant = {
  hidden: {
    opacity: 0,
    y: -4,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.4,
    },
  },

  exit: {
    opacity: 0,
    y: -4,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
};

const Navbar = () => {
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState();
  const [opened, setOpened] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [desktopOpened, setDesktopOpened] = useState(true);
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isSmallScreen = useMediaQuery('(max-height: 656px)');

  const path = location.pathname.split('/').pop();
  const currentPage = toCapitalize(path);

  const desktopLinks = menu.map((item) => (
    <Anchor
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      component={item.isExternal ? 'a' : Link}
      onClick={() => {
        if (!item.isExternal) {
          setActive(item.label);
        }
      }}
      {...(!item.isExternal && { to: item.link })}
      {...(item.isExternal && { href: item.link, target: '_blank', rel: 'noreferrer' })}
      {...(item.isComingSoon && { onMouseEnter: () => setPopoverOpened(item.label), onMouseLeave: () => setPopoverOpened(null) })}>
      <item.icon className={classes.linkIcon} />
      <AnimatePresence exitBeforeEnter>
        {desktopOpened && (
          <motion.span className={classes.linkLabel} key={item.label} initial="hidden" animate="visible" exit="exit" variants={linkVariant}>
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {item.isComingSoon && popoverOpened === item.label && <div className={classes.popover}>Coming Soon!</div>}
    </Anchor>
  ));

  const mobileLinks = menu.map((item) => (
    <Anchor
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      component={item.isExternal ? 'a' : Link}
      onClick={() => {
        if (!item.isExternal) {
          setActive(item.label);
        }
        setOpened(false);
      }}
      {...(!item.isExternal && { to: item.link })}
      {...(item.isExternal && { href: item.link, target: '_blank', rel: 'noreferrer' })}>
      <item.icon className={classes.linkIcon} />
      <span key={item.label}>{item.label}</span>
    </Anchor>
  ));

  useEffect(() => {
    setActive(currentPage);
  }, [currentPage]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isTablet || isSmallScreen ? (
        <Nav className={cx(classes.mobileNav, { [classes.mobileNavOpened]: opened })}>
          <Nav.Section className={classes.mobileHeader}>
            <Logo className={classes.logo} />
            <Burger className={classes.mobileBurger} color="#9C9C9E" size={24} opened={opened} onClick={() => setOpened((o) => !o)} />
          </Nav.Section>
          <AnimatePresence exitBeforeEnter>
            {opened && (
              <Nav.Section className={classes.mobileMenu} component={motion.div} key="mobile-menu" initial="hidden" animate="visible" exit="exit" variants={mobileLinkVariant}>
                {mobileLinks}
              </Nav.Section>
            )}
          </AnimatePresence>
        </Nav>
      ) : (
        <Nav className={cx(classes.nav, { [classes.navClosed]: !desktopOpened })}>
          <Nav.Section className={classes.header}>
            <Logo className={classes.logo} />
            <Burger className={classes.desktopBurger} color="#9C9C9E" size={24} opened={desktopOpened} onClick={() => setDesktopOpened((o) => !o)} />
          </Nav.Section>

          <Nav.Section>
            <Group direction="column" spacing={12}>
              {desktopLinks}
            </Group>
          </Nav.Section>
        </Nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
