import React, { useState, useMemo } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Badge,
  CircularProgress,
  Avatar
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FiAlignLeft, FiArrowLeft } from "react-icons/fi";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useOpenseaAssets } from '../../hooks/useReservoir';
import BasketModal from '../ui/basketModal/basketModal';
import { BasketItem, BasketModalMode } from '../ui/basketModal/BasketModal.types';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { useAccount } from 'wagmi';
import { dashboardStyles } from './dashboard.styles';
import { formatDate, calculateTransactionDetails, createDynamicItem } from './dashboardHelpers';
import { DashboardContentProps, DynamicItem } from './dashboard.types';

const projectId = '94fb09ee0c7f253b6897a59044a23a88';
const chains: readonly [typeof mainnet] = [mainnet];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: "NFT Marketplace",
    description: "A marketplace for NFTs",
    url: "https://nftmarketplace.com",
    icons: ["https://nftmarketplace.com/icon.png"]
  }
});
createWeb3Modal({ wagmiConfig, projectId });

const DashboardContent: React.FC<DashboardContentProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { isConnected, address } = useAccount();
  const { data: assets, isLoading, error } = useOpenseaAssets({ orderDirection: 'desc', limit: 5 });
  console.log('data', assets, isLoading, error);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = dashboardStyles(theme, isSmallScreen, isConnected);

  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [modalMode, setModalMode] = useState<BasketModalMode>('basket');
  const [conversionRate] = useState(45000);

  const dynamicItems = useMemo(() => 
    assets?.map((asset: any) => createDynamicItem(asset, conversionRate)) || [], 
    [assets, conversionRate]
  );

  const transactionDetails = useMemo(() => 
    calculateTransactionDetails(basketItems), 
    [basketItems]
  );

  const handleCardClick = (item: DynamicItem) => {
    if (!isConnected) {
      alert('Please connect your wallet to add items to cart');
      return;
    }

    const basketItem: BasketItem = {
      id: item.id,
      name: item.title,
      btcAmount: `${item.price.btc} BTC`,
      sats: `${Math.round(parseFloat(item.price.btc) * 100000000).toLocaleString()}sats`,
      usdAmount: `$${item.price.usd}`,
      ethPrice: item.floorPriceETH
    };
    setBasketItems(prev => [...prev, basketItem]);
  };

  const handleCloseBasket = () => {
    setIsBasketModalOpen(false);
    if (modalMode === 'checkout') setBasketItems([]);
    setModalMode('basket');
  };

  const handleCheckout = async () => {
    try {
      console.log('Checkout initiated:', basketItems);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setModalMode('checkout');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  const handleAddAnother = () => {
    setIsBasketModalOpen(false);
    setTimeout(() => setIsBasketModalOpen(true), 100);
  };

  const handleRemoveItem = (itemId: string) => {
    setBasketItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <Box sx={styles.root}>
        <Box sx={styles.header}>
          <Box sx={styles.headerLeft}>
            <IconButton onClick={toggleSidebar} sx={{ color: '#FFFFFF' }}>
              {isSmallScreen ? <FiAlignLeft /> : <FiArrowLeft />}
            </IconButton>
            <Typography variant="h6" sx={styles.marketplaceTitle}>
              Marketplace
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: isSmallScreen ? 1 : 2 }}>
            <Box sx={styles.walletContainer}>
              <Box sx={styles.btcBalance}>
                <img
                  src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=024"
                  alt="BTC"
                  style={{ width: 16, height: 16 }}
                />
                <Typography variant="body2" sx={{ color: '#FFFFFF', whiteSpace: 'nowrap', fontSize: isSmallScreen ? '0.8rem' : '1rem' }}>
                  0.012 BTC
                </Typography>
              </Box>

              <Box sx={styles.walletConnect} onClick={() => document.querySelector('w3m-button')?.click()}>
                <Box sx={styles.connectionStatus} />
                <Typography variant="body2" sx={{ 
                  color: '#FFFFFF', 
                  whiteSpace: 'nowrap', 
                  fontSize: isSmallScreen ? '0.8rem' : '1rem',
                  flex: 1,
                  textAlign: 'center'
                }}>
                  {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
                </Typography>
                <Box sx={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }}>
                  <w3m-button balance="hide" />
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton sx={{ color: '#FFFFFF' }}>
                <NotificationsIcon />
              </IconButton>
              <IconButton
                onClick={() => setIsBasketModalOpen(true)}
                sx={{ color: '#FFFFFF', display: { xs: 'none', md: 'inline-flex' } }}
                disabled={!isConnected}
              >
                <Badge badgeContent={basketItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton sx={{ display: { xs: 'none', md: 'inline-flex' }, p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src="avatarImageURL"
                  sx={{ width: 40, height: 40, border: '2px solid #F9A825' }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ padding: 3, marginTop: '60px', ml: 10, mr: 10 }}>
          <Typography variant="h4" gutterBottom>
            NFT Marketplace
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ display: 'flex', gap: 1 }}>
            Listings : <Box component="span" sx={{ color: '#F9A825' }}>{dynamicItems.length}</Box>
          </Typography>

          {isLoading ? (
            <Box sx={styles.loadingContainer}>
              <CircularProgress sx={{ color: '#F9A825' }} />
            </Box>
          ) : error ? (
            <Box sx={{ padding: 3, color: 'error.main' }}>
              Error loading assets: {error.message}
            </Box>
          ) : (
            <Grid container spacing={isSmallScreen ? 2 : 3}>
              {dynamicItems.map((item: DynamicItem, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={item.id || index}>
                  <Card sx={styles.nftCard} onClick={() => handleCardClick(item)}>
                    <Box sx={styles.priceBadge}>
                      <Typography component="span">{item.price.btc} BTC</Typography>
                      |
                      <Typography component="span" sx={{ fontWeight: 'bold', color: '#FFFFFF', opacity: 0.9, lineHeight: 1.2, fontSize: '0.9rem' }}>
                        ${item.price.usd}
                      </Typography>
                    </Box>

                    <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={styles.nftImage as React.CSSProperties}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-nft.png';
                        }}
                      />
                      <Typography variant="caption" sx={styles.listedBadge}>
                        LISTED
                      </Typography>
                    </Box>

                    <CardContent sx={styles.cardContent}>
                      <Box sx={styles.nftDetails}>
                        <Typography variant="caption" sx={{ display: 'block', color: '#FFFFFF', fontSize: '0.75rem', marginBottom: '4px', opacity: 0.8 }}>
                          {formatDate(item.date)}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFFFFF', marginBottom: '4px', fontSize: '1.1rem' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#F9A825', fontWeight: 'bold' }}>
                          QTY: {item.quantity}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          <BasketModal
            open={isBasketModalOpen}
            onClose={handleCloseBasket}
            mode={modalMode}
            items={basketItems}
            feeSavings={{ sats: "5,035sats", usdAmount: "$3.35" }}
            expectedTotal={{
              btc: `${transactionDetails.totalBTC} BTC`,
              usd: `$${transactionDetails.totalUSD}`
            }}
            onAddAnother={handleAddAnother}
            onCheckout={handleCheckout}
            onRemoveItem={handleRemoveItem}
            transactionDetails={modalMode === 'checkout' ? transactionDetails : undefined}
          />
        </Box>
      </Box>
    </WagmiConfig>
  );
};

export default DashboardContent;