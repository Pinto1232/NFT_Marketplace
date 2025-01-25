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
import BasketModal from '../ui/basketModal/BasketModal';
import { BasketItem, BasketModalMode } from '../ui/basketModal/BasketModal.types';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { useAccount } from 'wagmi';

// WalletConnect configuration
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
createWeb3Modal({
  wagmiConfig,
  projectId,
});

interface AssetData {
  id: string;
  name: string;
  image: string;
  contractDeployedAt: string;
  createdAt: string;
  floorAsk?: {
    price: {
      amount: {
        usd: number;
        native: number;
      }
    }
  };
  tokenCount: string;
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
};

const DashboardContent: React.FC<{ toggleSidebar: () => void; isSidebarOpen: boolean }> = ({
  toggleSidebar,
  isSidebarOpen,
}) => {
  const { isConnected, address } = useAccount();
  const { data: assets, isLoading, error } = useOpenseaAssets({
    orderDirection: 'desc',
    limit: 5,
  });

  console.log('data', assets, isLoading, error);

  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [modalMode, setModalMode] = useState<BasketModalMode>('basket');
  const [conversionRate] = useState(45000);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dynamicItems = useMemo(() => {
    if (!assets) return [];

    return assets.map((asset: AssetData) => {
      const primaryDate = asset.contractDeployedAt || asset.createdAt || new Date().toISOString();
      const usdValue = asset.floorAsk?.price?.amount?.usd || 0;
      const ethPrice = asset.floorAsk?.price?.amount?.native?.toFixed(4) || 'N/A';

      return {
        id: asset.id,
        title: asset.name || "Unnamed Asset",
        price: {
          btc: (usdValue / conversionRate).toFixed(4),
          usd: usdValue.toFixed(2)
        },
        quantity: asset.tokenCount || "1",
        imageUrl: asset.image || '/placeholder-nft.png',
        date: primaryDate,
        floorPriceETH: ethPrice
      };
    });
  }, [assets, conversionRate]);

  const handleCardClick = (item: typeof dynamicItems[number]) => {
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
    if (modalMode === 'checkout') {
      setBasketItems([]);
    }
    setModalMode('basket');
  };

  const handleCheckout = async () => {
    try {
      console.log('Checkout initiated with:', basketItems);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setModalMode('checkout');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  const handleAddAnother = () => {
    setIsBasketModalOpen(false);
    setTimeout(() => {
      setIsBasketModalOpen(true);
    }, 100);
  };

  const handleRemoveItem = (itemId: string) => {
    setBasketItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Static fee configuration
  const staticFees = {
    btc: "0.0005",
    usd: "20.00"
  };

  const transactionDetails = {
    totalBTC: (basketItems.reduce((acc, item) => acc + parseFloat(item.btcAmount), 0) + parseFloat(staticFees.btc)).toFixed(4),
    totalUSD: (basketItems.reduce((acc, item) => acc + parseFloat(item.usdAmount.replace('$', '')), 0) + parseFloat(staticFees.usd)).toFixed(2),
    transactionId: 'txn_' + Math.random().toString(36).substr(2, 9)
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <Box sx={{ backgroundColor: '#14181C', color: '#FFFFFF', minHeight: '100vh' }}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#1E1F25',
            padding: '10px 20px',
            borderBottom: '1px solid #444',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: { xs: 0, md: 29 }, }}>
            <IconButton onClick={toggleSidebar} sx={{ color: '#FFFFFF' }}>
              {isSmallScreen ? <FiAlignLeft /> : <FiArrowLeft />}
            </IconButton>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '12px' : '1.25rem' }}
            >
              Marketplace
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: isSmallScreen ? 1 : 2,
            }}
          >
            <Box sx={{
              display: 'flex',
              border: '1px solid rgb(113, 84, 55)',
              borderRadius: '20px',
              padding: 1,
              gap: 1,
              width: 'fit-content',
              backgroundColor: '#1E1F25'
            }}>
              {/* BTC Balance Section */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#333',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  gap: 1,
                  minWidth: 120
                }}
              >
                <img
                  src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=024"
                  alt="BTC"
                  style={{ width: 16, height: 16 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                    fontSize: isSmallScreen ? '0.8rem' : '1rem',
                  }}
                >
                  0.012 BTC
                </Typography>
              </Box>

              {/* Wallet Connection Section */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#333',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  position: 'relative',
                  minWidth: 120,
                  border: '1px solid #F9A825',
                  '&:hover': {
                    backgroundColor: '#404040',
                    borderColor: '#FFC107'
                  }
                }}
                onClick={() => document.querySelector('w3m-button')?.click()}
              >
                {/* Connection Status Indicator */}
                <Box
                  sx={{
                    backgroundColor: isConnected ? '#FFC107' : 'transparent',
                    borderRadius: '50%',
                    width: 10,
                    height: 10,
                    mr: 1,
                    transition: 'background-color 0.3s'
                  }}
                />

                {/* Wallet Address/Connect Text */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                    fontSize: isSmallScreen ? '0.8rem' : '1rem',
                    flex: 1,
                    textAlign: 'center'
                  }}
                >
                  {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
                </Typography>

                {/* Hidden Web3Modal Integration */}
                <Box sx={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  '& w3m-button': {
                    width: '100%',
                    height: '100%'
                  }
                }}>
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
              <IconButton sx={{
                display: { xs: 'none', md: 'inline-flex' },
                p: 0
              }}>
                <Avatar
                  alt="User Avatar"
                  src="avatarImageURL"
                  sx={{
                    width: 40,
                    height: 40,
                    border: '2px solid #F9A825'
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ padding: 3, marginTop: '60px' }}>
          <Typography variant="h4" gutterBottom>
            NFT Marketplace
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ display: 'flex', gap: 1 }}>
            Listings : <Box component="span" sx={{ color: '#F9A825' }}>{dynamicItems.length}</Box>
          </Typography>
          {isLoading ? (
            <Box sx={{ padding: 3, textAlign: 'center' }}>
              <CircularProgress sx={{ color: '#F9A825' }} />
            </Box>
          ) : error ? (
            <Box sx={{ padding: 3, color: 'error.main' }}>
              Error loading assets: {error.message}
            </Box>
          ) : (
            <Grid container spacing={isSmallScreen ? 2 : 3}>
              {dynamicItems.map((item: typeof dynamicItems[number], index: number) => (
                <Grid item xs={12} sm={6} md={4} key={item.id || index}>
                  <Card
                    sx={{
                      backgroundColor: '#1E1F25',
                      color: '#FFFFFF',
                      borderRadius: '20px',
                      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden',
                      position: 'relative',
                      border: '1px solid gray',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}
                    onClick={() => handleCardClick(item)}
                  >
                    <Box sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: '#333333',
                      color: '#F9A825',
                      padding: '5px 15px',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      zIndex: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <Typography component="span">
                        {item.price.btc} BTC
                      </Typography>
                      |
                      <Typography component="span" sx={{
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        opacity: 0.9,
                        lineHeight: 1.2,
                        fontSize: '0.9rem',
                      }}>
                        ${item.price.usd}
                      </Typography>
                    </Box>

                    <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          display: 'block',
                          backgroundColor: '#2A2A2A'
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-nft.png';
                        }}
                      />
                      <Typography variant="caption" sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        color: '#FFFFFF',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}>
                        LISTED
                      </Typography>
                    </Box>

                    <CardContent sx={{ textAlign: 'center', padding: '15px' }}>
                      <Box sx={{
                        padding: '15px',
                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                        background: '#303139',
                        borderRadius: '20px',
                        textAlign: 'left',
                      }}>
                        <Typography variant="caption" sx={{
                          display: 'block',
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          marginBottom: '4px',
                          opacity: 0.8,
                        }}>
                          {formatDate(item.date)}
                        </Typography>

                        <Typography variant="h6" sx={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                          marginBottom: '4px',
                          fontSize: '1.1rem',
                        }}>
                          {item.title}
                        </Typography>

                        <Typography variant="body2" sx={{
                          fontSize: '0.9rem',
                          color: '#F9A825',
                          fontWeight: 'bold',
                        }}>
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
            feeSavings={{
              sats: "5,035sats",
              usdAmount: "$3.35"
            }}
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