import React, { useContext } from 'react';
import { Anchor } from '@mantine/core';
import EtherContext from '../../context/EtherContext';
import Navbar from '../Navbar/Navbar';
import WalletButton from '../Wallet/WalletButton';
import WalletMessage from '../Wallet/WalletMessage';
import { ReactComponent as Twitter } from '../../assets/social-twitter.svg';
import { ReactComponent as Discord } from '../../assets/social-discord.svg';
import { ReactComponent as Telegram } from '../../assets/social-telegram.svg';
import useStyles from './AppSection.styles';

const NavbarSection = ({ children }) => {
  const { user } = useContext(EtherContext);
  const { classes } = useStyles();

  return (
    <div className={classes.section}>
      <Navbar />

      <div className={classes.content}>
        <div className={classes.wallet}>{user ? <WalletMessage /> : <WalletButton />}</div>
        {children}
        <div className={classes.social}>
          <Anchor className={classes.icon} href="/" target="_blank" rel="noreferrer">
            <Twitter />
          </Anchor>
          <Anchor className={classes.icon} href="/" target="_blank" rel="noreferrer">
            <Discord />
          </Anchor>
          <Anchor className={classes.icon} href="/" target="_blank" rel="noreferrer">
            <Telegram />
          </Anchor>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection;
