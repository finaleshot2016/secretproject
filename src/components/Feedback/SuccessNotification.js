import { Title, Text, UnstyledButton } from '@mantine/core';
import React from 'react';
import { ReactComponent as Success } from '../../assets/notif-success.svg';
import { ReactComponent as Close } from '../../assets/notif-close.svg';
import useStyles from './SuccessNotification.styles';

const SuccessNotification = ({ title, description, onClose }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.notif}>
      <UnstyledButton className={classes.btn} onClick={onClose}>
        <Close />
      </UnstyledButton>
      <Success className={classes.icon} />
      <Title className={classes.title} order={3}>
        {title}
      </Title>
      <Text size="md">{description}</Text>
    </div>
  );
};

export default SuccessNotification;
