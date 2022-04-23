import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';
import otoAbi from '../utils/otoAbi.json';
import wavaxAbi from '../utils/wavaxAbi.json';
import { useLocation } from 'react-router-dom';

const EtherContext = React.createContext();

const defaultDashboardData = {
  avaxPrice: 0,
  price: 0,
  marketCap: 0,
  // holders: 0,
  rewards: 0,
  totalSupply: 0,
  circulatingSupply: 0,
  AVAXliq: 0,
  treasuryValue: 0,
  vaultValue: 0,
  firepitValue: 0,
  firepitPercentage: 0,
};

const defaultWalletData = {
  balance: 0,
  balanceInUSD: 0,
  AVAXbalance: 0,
  AVAXbalanceInUSD: 0,
};

export const EtherContextProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(defaultDashboardData);      
  const [walletData, setWalletData] = useState(defaultWalletData);                        
  const [user, setUser] = useState(() => {
    const stickyValue = sessionStorage.getItem('user');
    return stickyValue !== null ? JSON.parse(stickyValue) : null;
  });

  const avaxProvider = useMemo(() => new ethers.providers.getDefaultProvider('https://api.avax.network/ext/bc/C/rpc'), []);
  const otoContract = useMemo(() => new ethers.Contract('0x0aC80E1753deA5e298E8a2b6CF53f161937806A1', otoAbi, avaxProvider), [avaxProvider]);
  const wavaxContract = useMemo(() => new ethers.Contract('0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', wavaxAbi, avaxProvider), [avaxProvider]);
  const lpPair = '0xA3cee13997444Ba518f0aebc12e7D155D9b03b22';
  const tokenDecimal = 5;

  const location = useLocation();

  const firepitAddress = "0x000000000000000000000000000000000000dead"; //REPLACE WITH ACTUAL TOKEN FIREPIT CA
  const treasuryAddress = "0xa225478725be5f5ae612182db99547e4da86e66e"; //REPLACE WITH ACTUAL TOKEN TREASURY CA
  const vaultAddress = "0xac9c036af64ad44a83acb7786e6942944949147d"; //REPLACE WITH ACTUAL TOKEN INSURANCE CA

  const tokenFormatEther = (value) => {
    return ethers.utils.formatUnits(value, tokenDecimal);
  };

  // Dashboard
  const getAvaxPrice = useCallback(async () => {
    const response = await fetch('https://api.coinstats.app/public/v1/coins/avalanche-2');
    const data = await response.json();
    const avaxPrice = data.coin.price;

    return avaxPrice;
  }, []);

  const getLPBalance = useCallback(async () => {
    const avaxBalance = await wavaxContract.balanceOf(lpPair);
    const tokenBalance = await otoContract.balanceOf(lpPair);

    return {
      avax: ethers.utils.formatUnits(avaxBalance, 18),
      token: tokenFormatEther(tokenBalance),
    };
  }, [wavaxContract, otoContract]);

  const getTokenPrice = useCallback((lpAvax, lpToken, avaxPrice) => {
    if (lpAvax && lpToken && avaxPrice) {
      const avaxBalanceInUsd = lpAvax * avaxPrice;
      const tokenPrice = (avaxBalanceInUsd / lpToken).toFixed(tokenDecimal);
      return parseFloat(tokenPrice);
    }
  }, []);

  const getTreasuryValue = useCallback(async (avaxPrice) => {
    const treasury = await avaxProvider.getBalance(treasuryAddress);
    const treasuryBalance = ethers.utils.formatUnits(treasury, 18);
    const treasuryValue = treasuryBalance * avaxPrice;
    return parseFloat(treasuryValue).toFixed(2);
  }, [avaxProvider]);

  const getVaultValue = useCallback(async (avaxPrice) => {
    const vault = await avaxProvider.getBalance(vaultAddress);
    const vaultBalance = ethers.utils.formatUnits(vault, 18);
    const vaultValue = vaultBalance * avaxPrice;
    return parseFloat(vaultValue).toFixed(2);
  }, [avaxProvider]);

  const getFirepitValue = useCallback(async (otoPrice) => {
    const firepit = await otoContract.balanceOf(firepitAddress);
    const firepitBalance = tokenFormatEther(firepit);
    const firepitValue = firepitBalance * otoPrice;

    return parseFloat(firepitValue).toFixed(2);
  }, [otoContract]);

  const getMarketCap = useCallback(
    async (otoPrice) => {
      let totalSupply = await otoContract._totalSupply();

      let marketCap = parseFloat(tokenFormatEther(totalSupply)) * otoPrice; 

      return marketCap.toFixed(2);
    },
    [otoContract]
  );

  const getTotalSupply = useCallback(
    async (otoPrice) => {
      const totalSupply = await otoContract._totalSupply();
      return parseFloat(tokenFormatEther(totalSupply)).toFixed(2);
    },
    [otoContract]
  );

  const getCirculatingSupply = useCallback(async () => {
    let firepitBalance = await otoContract.balanceOf(firepitAddress);
    let totalSupply = await otoContract._totalSupply();
    let circulatingSupply = parseFloat(tokenFormatEther(totalSupply - firepitBalance)).toFixed(2);

    return parseFloat(circulatingSupply).toFixed(2);
  }, [otoContract]);

  const getFirepitPercentage = useCallback(async (totalSupply, circulatingSupply) => {
    const firepitPercentage = (totalSupply - circulatingSupply) / totalSupply * 100;

    return parseFloat(firepitPercentage).toFixed(2);
  }, [otoContract]);
  // const lockTokens = async (amount, days) => {
  //   const daysInSeconds = days * 86400; //86400 seconds per day
  //   let signer = this.procMetamask();
  //   signer.signMessage('Lock Tokens');
  //   await otoContract.lockInitialTokens(amount, daysInSeconds);
  // };

  // const getRemainingTokenLockTime = async (address) => {
  //   const seconds = otoContract.getRemainingTokenLockTime(address);
  //   if (seconds > 86400) {
  //     const daysInSeconds = seconds / 86400;
  //   }
  // };

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const user = await signer.getAddress();

    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };                                             

  const getAccountBalance = useCallback(
    async (address) => {
      if (!address) {
        return;
      }
      const balance = await otoContract.balanceOf(address);
      return parseFloat(tokenFormatEther(balance)).toFixed(5);
    },
    [otoContract]
  );          
  
  const getAVAXBalance = useCallback(
    async (address) => {
      if (!address) {
        return;
      }
      const AVAXbalance = await avaxProvider.getBalance(address);
      return parseFloat(ethers.utils.formatUnits(AVAXbalance, 18)).toFixed(3);
    },
    [avaxProvider]
  );  

  // Account
  const calculateWallet = useCallback(async () => {
    const balance = await getAccountBalance(user);
    const balanceInUSD = (balance * dashboardData.price).toFixed(3);
    const AVAXbalance = await getAVAXBalance(user);
    const AVAXbalanceInUSD = (AVAXbalance * dashboardData.avaxPrice).toFixed(3);

    setWalletData((prevData) => ({
      balance, balanceInUSD, AVAXbalance, AVAXbalanceInUSD
    }));
  }, [getAccountBalance, dashboardData.price , getAVAXBalance, dashboardData.avaxPrice]);

  useEffect(() => {
    if (user) {
      calculateWallet();
    }
  }, [user, location.pathname, calculateWallet]);

  // On page load
  const fetchData = useCallback(async () => {
    const avaxPrice = await getAvaxPrice();
    const lpBalance = await getLPBalance();
    const otoPrice = getTokenPrice(lpBalance.avax, lpBalance.token, avaxPrice);
    const AVAXliq = getTokenPrice(lpBalance.avax, 1, avaxPrice).toFixed(2);
    const marketCap = await getMarketCap(otoPrice);
    const totalSupply = await getTotalSupply();
    const circulatingSupply = await getCirculatingSupply();
    const treasuryValue = await getTreasuryValue(avaxPrice);
    const vaultValue = await getVaultValue(avaxPrice);
    const firepitValue = await getFirepitValue(otoPrice);
    const firepitPercentage = await getFirepitPercentage(totalSupply, circulatingSupply);

    setDashboardData({ avaxPrice, price: otoPrice, marketCap, totalSupply, circulatingSupply, AVAXliq, treasuryValue, vaultValue, firepitValue, firepitPercentage});
  }, [getAvaxPrice, getLPBalance, getTokenPrice, getMarketCap, getTotalSupply, getCirculatingSupply, getTreasuryValue, getVaultValue, getFirepitValue, getFirepitPercentage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <EtherContext.Provider value={{ dashboardData, walletData, connectWallet, user}}>
      {children}
    </EtherContext.Provider>
  );
};

export default EtherContext;
