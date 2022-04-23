import React, { useContext } from 'react';
import { Title, Text, Image, SimpleGrid } from '@mantine/core';
import EtherContext from '../../context/EtherContext';
import Card from '../../components/Card/Card';
import { ReactComponent as Price } from '../../assets/dashboard-price.svg';
import { ReactComponent as MarketCap } from '../../assets/dashboard-market.svg';
// import { ReactComponent as Holders } from '../../assets/dashboard-holders.svg';
import { ReactComponent as Liquidity } from '../../assets/dashboard-liquidity.svg';
import { ReactComponent as TotalSupply } from '../../assets/dashboard-totalsupply.svg';
import { ReactComponent as CirculatingSupply } from '../../assets/dashboard-circulatingsupply.svg';
import { ReactComponent as Burn } from '../../assets/dashboard-burn.svg';
import { ReactComponent as Treasury } from '../../assets/dashboard-treasury.svg';
import { ReactComponent as Vault} from '../../assets/dashboard-vault.svg';
import { ReactComponent as FirepitValue} from '../../assets/dashboard-firepitvalue.svg';
import { ReactComponent as BackedLiquidity} from '../../assets/dashboard-backedliquidity.svg';
import gradient1 from '../../assets/gradient-1.png';
import gradient2 from '../../assets/gradient-2.png';
import gradient3 from '../../assets/gradient-3.png';
import useStyles from './Dashboard.styles';

const Dashboard = () => {
  const { dashboardData } = useContext(EtherContext);
  const { classes } = useStyles();


  const row1 = [
    { icon: Price, title: 'Token Price', value: "$" + dashboardData.price },
    { icon: MarketCap, title: 'Market Cap', value: "$" + dashboardData.marketCap },
    // { icon: Holders, title: 'Holders', value: 0.0 },
    { icon: Liquidity, title: 'AVAX Liquidity Value', value: "$" + dashboardData.AVAXliq },
  ];

  const row2 = [
    { icon: TotalSupply, title: 'Total Supply', value: dashboardData.totalSupply + " TOKEN" },
    { icon: CirculatingSupply, title: 'Circulating Supply', value: dashboardData.circulatingSupply + " TOKEN"},
    // { icon: Holders, title: 'Holders', value: 0.0 },
    { icon: Burn, title: 'Fire pit Supply %', value: dashboardData.firepitPercentage + "%" },
  ];

  const row3 = [
    { icon: Treasury, title: 'Treasury Value', value: "$" + dashboardData.treasuryValue },
    { icon: Vault, title: 'Vault Value', value: "$" + dashboardData.vaultValue },
    // { icon: Holders, title: 'Holders', value: 0.0 },
    { icon: FirepitValue, title: 'Fire Pit Value', value: "$" + dashboardData.firepitValue },
    { icon: BackedLiquidity, title: 'Backed Liquidity', value: "100%" },
  ];

  const row1List = row1.map((item) => (
    <Card key={item.title} className={classes.cardStat}>
      <item.icon className={classes.cardStatIcon} />
      <div>
        <Title className={classes.cardStatTitle} order={5}>
          {item.title}
        </Title>
        <Text size="md">{item.value}</Text>
      </div>
    </Card>
  ));

  const row2List = row2.map((item) => (
    <Card key={item.title} className={classes.cardStat}>
      <item.icon className={classes.cardStatIcon} />
      <div>
        <Title className={classes.cardStatTitle} order={5}>
          {item.title}
        </Title>
        <Text size="md">{item.value}</Text>
      </div>
    </Card>
  ));

  const row3List = row3.map((item) => (
    <Card key={item.title} className={classes.cardStat}>
      <item.icon className={classes.cardStatIcon} />
      <div>
        <Title className={classes.cardStatTitle} order={5}>
          {item.title}
        </Title>
        <Text size="md">{item.value}</Text>
      </div>
    </Card>
  ));

  return (
    <div>
      <SimpleGrid className={classes.row} cols={3} spacing={40} breakpoints={[{ maxWidth: 1024, cols: 1 }]}>
        {row1List}
      </SimpleGrid>

      <SimpleGrid className={classes.row} cols={3} spacing={40} breakpoints={[{ maxWidth: 1024, cols: 1 }]}>
        {row2List}
      </SimpleGrid>

      <SimpleGrid className={classes.row} cols={4} spacing={40} breakpoints={[{ maxWidth: 1024, cols: 0 }]}>
        {row3List}
      </SimpleGrid>

      <div className={classes.row}>
        <Card className={classes.chart}>
          <iframe className={classes.dex} src="https://dexscreener.com/bsc/0x2f3899ffb9fdcf635132f7bb94c1a3a0f906cc6f" title="dexchart"></iframe>
        </Card>
      </div>

      <Image className={classes.gradient1} src={gradient1} />
      <Image className={classes.gradient2} src={gradient2} />
      <Image className={classes.gradient3} src={gradient3} />
    </div>
  );
};

export default Dashboard;
