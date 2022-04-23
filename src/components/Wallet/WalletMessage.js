import React from 'react';
import { Text } from '@mantine/core';
import { ReactComponent as Secure } from '../../assets/nav-secure.svg';
import useStyles from './WalletMessage.styles';

const WalletMessage = ( user ) => {
  const { classes } = useStyles();

  return (
    <div className={classes.connected}>
      <Text className={classes.connectedMessage} size="md">
      WALLET CONNECTED
      </Text>
      <Secure />
    </div>
  );
};

export default WalletMessage;
