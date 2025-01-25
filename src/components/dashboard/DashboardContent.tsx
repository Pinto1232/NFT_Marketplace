import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Avatar,
  Badge
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FiAlignLeft } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useOpenseaAssets } from '../../hooks/useReservoir';
import BasketModal from '../ui/basketModal/BasketModal';
import { BasketItem, BasketModalMode } from '../ui/basketModal/BasketModal.types';

const DashboardContent: React.FC<{ toggleSidebar: () => void; isSidebarOpen: boolean }> = ({
  toggleSidebar,
  isSidebarOpen,
}) => {
  const { data: assets, isLoading, error } = useOpenseaAssets({
    orderDirection: 'desc',
    limit: 10,
  });
  
  console.log('data', assets, isLoading, error);

  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [modalMode, setModalMode] = useState<BasketModalMode>('basket');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const items = [
    {
      title: 'Orange Ranger',
      price: { btc: '0.0018', usd: '120.00' },
      quantity: '241',
      imageUrl: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fbored-ape-yacht-club-nft-3-4-million-record-sothebys-metaverse-0.jpg?w=960&cbr=1&q=90&fit=max',
      date: '2024-02-12T13:32:00'
    },
    {
      title: 'Founder Drop Vault',
      price: { btc: '0.0030', usd: '200.00' },
      quantity: '15',
      imageUrl: 'https://cdn.prod.website-files.com/6615636a03a6003b067c36dd/661ffd0dbe9673d914edca2d_6423fc9ca8b5e94da1681a70_Screenshot%25202023-03-29%2520at%252010.53.43.jpeg',
      date: '2024-02-12T14:45:00'
    },
    {
      title: 'Halloween Drop Vault',
      price: { btc: '0.0040', usd: '266.67' },
      quantity: '12',
      imageUrl: 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/canvas/2024/04/24/a94e2d09-2f19-4bd2-a13f-6d6eff58684c_eadcc3b5.jpg?itok=X0MrjxZs&v=1713940582',
      date: '2024-10-31T18:00:00'
    },
    {
      title: 'Alien Drop Vault',
      price: { btc: '0.0020', usd: '133.33' },
      quantity: '20',
      imageUrl: 'https://coingape.com/wp-content/uploads/2022/12/2_20230102_120403_0001.jpg',
      date: '2024-06-15T09:15:00'
    },
    {
      title: 'Digitek Drop Vault',
      price: { btc: '0.0010', usd: '66.67' },
      quantity: '25',
      imageUrl: 'https://www.kfadv.it/wp-content/uploads/Bored_Apes.jpg',
      date: '2024-07-01T12:00:00'
    },
  ];

  const handleCardClick = (item: typeof items[number]) => {
    const basketItem: BasketItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: item.title,
      btcAmount: `${item.price.btc} BTC`,
      sats: `${Math.round(parseFloat(item.price.btc) * 100000000).toLocaleString()}sats`,
      usdAmount: `$${item.price.usd}`
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
    console.log('Add another item logic here');
  };

  const handleRemoveItem = (itemId: string) => {
    setBasketItems(prev => prev.filter(item => item.id !== itemId));
  };

  const transactionDetails = {
    totalBTC: `${basketItems.reduce((acc, item) => acc + parseFloat(item.btcAmount), 0).toFixed(4)} BTC`,
    totalUSD: `$${basketItems.reduce((acc, item) => acc + parseFloat(item.usdAmount.replace('$', '')), 0).toFixed(2)}`,
    transactionId: 'txn_' + Math.random().toString(36).substr(2, 9)
  };

  return (
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
          <Box sx={{ display: 'flex', border: '1px solid rgb(113, 84, 55)', borderRadius: '20px', padding: 1, }} >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#333',
                padding: '5px 10px',
                borderRadius: '20px',
                gap: 1,
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

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#333',
                padding: '5px 10px',
                borderRadius: '20px',
                border: '1px solid rgb(113, 84, 55)',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#FFC107',
                  borderRadius: '50%',
                  width: 10,
                  height: 10,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  fontSize: isSmallScreen ? '0.8rem' : '1rem',
                }}
              >
                xfs...fas
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: '#FFFFFF' }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton 
              onClick={() => {
                setIsBasketModalOpen(true);
                setModalMode('basket');
              }}
              sx={{
                color: '#FFFFFF',
                display: { xs: 'none', md: 'inline-flex' }
              }}
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
          Listings : <Box component="span" sx={{ color: '#F9A825' }}>{items.length}</Box>
        </Typography>
        <Grid container spacing={isSmallScreen ? 2 : 3}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                    style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
                  />
                  <Typography variant="caption" sx={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}>
                    IN-GAME
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
                      {new Date(item.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
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
            btc: `${basketItems.reduce((acc, item) => acc + parseFloat(item.btcAmount), 0).toFixed(4)}BTC`,
            usd: `$${basketItems.reduce((acc, item) => acc + parseFloat(item.usdAmount.replace('$', '')), 0).toFixed(2)}`
          }}
          onAddAnother={handleAddAnother}
          onCheckout={handleCheckout}
          onRemoveItem={handleRemoveItem}
          transactionDetails={modalMode === 'checkout' ? transactionDetails : undefined}
        />
      </Box>
    </Box>
  );
};

export default DashboardContent;