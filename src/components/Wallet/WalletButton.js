import React, { useContext } from 'react';
import { Button } from '@mantine/core';
import EtherContext from '../../context/EtherContext';
import useStyles from './WalletButton.styles';

const WalletButton = () => {
  const { connectWallet } = useContext(EtherContext);
  const { classes } = useStyles();

  return (
    <Button className={classes.btn} onClick={connectWallet}>
      Connect Wallet
    </Button>
  );
};

export default WalletButton;
