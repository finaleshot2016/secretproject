import React, { useContext } from 'react';
import { Title, Text, Image, SimpleGrid } from '@mantine/core';
import EtherContext from '../../context/EtherContext';
import Card from '../../components/Card/Card';
import { ReactComponent as Wallet } from '../../assets/account-balance.svg';
import { ReactComponent as Avax } from '../../assets/account-avax.svg';
import { ReactComponent as AvaxPrice } from '../../assets/account-avaxprice.svg';
import gradient4 from '../../assets/gradient-4.png';
import gradient5 from '../../assets/gif1.gif';
import useStyles from './Account.styles';

const Account = () => {
  const {walletData, dashboardData} = useContext(EtherContext);
  const { classes } = useStyles();

  const row2 = [
    { icon: Avax, title: 'AVAX Balance', label: `${walletData.AVAXbalance} AVAX`, value: `$${walletData.AVAXbalanceInUSD}` },
    { icon: AvaxPrice, title: 'Avalanche Price', label: 'AVAX', value: `$${dashboardData.avaxPrice}` },
  ];

  const row2List = row2.map((item) => (
    <Card key={item.title} className={classes.cardStat}>
      <item.icon className={classes.cardStatIcon} />
      <div>
        <Title className={classes.cardStatTitle} order={5}>
          {item.title}
        </Title>
        <Text className={classes.cardStatLabel} size="md">
          {item.label}
        </Text>
        <Text size="md">{item.value}</Text>
      </div>
    </Card>
  ));

  return (
    <div>

      <div className={classes.row}>
        <Card className={classes.cardStat}>
          <Wallet className={classes.cardStatIcon} />
          <div>
            <Title className={classes.cardStatTitle} order={5}>
              Token Balance  
            </Title>
            <Text className={classes.cardStatLabel} size="md">
            {walletData.balance}
            </Text>
            <Text size="md">${walletData.balanceInUSD}</Text>
          </div>
        </Card>
      </div>

      <div className={classes.row}>
        <SimpleGrid className={classes.row} cols={2} spacing={40} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
          {row2List}
        </SimpleGrid>
      </div>

      <Image className={classes.gradient4} src={gradient4} />
      <Image className={classes.gradient5} src={gradient5} />
    </div>
  );
};

export default Account;
