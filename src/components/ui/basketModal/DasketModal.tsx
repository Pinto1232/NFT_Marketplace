import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  CircularProgress,
  useTheme,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  BasketModalProps,
} from './DasketModal.types';

const BasketModal = ({
  open,
  onClose,
  mode = 'basket',
  basketTitle = "My Basket",
  items = [],
  feeSavings = { sats: "5,035sats", usdAmount: "$3.35" },
  timeEstimate = "30 minutes",
  expectedTotal = { btc: "0.002BTC", usd: "$132.70" },
  onAddAnother,
  onCheckout,
  onRemoveItem,
  checkoutTitle = "Order Confirmed",
  transactionDetails
}: BasketModalProps) => {
  const theme = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckoutClick = async () => {
    if (!onCheckout) return;
    
    try {
      setIsProcessing(true);
      await onCheckout();
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 400,
        bgcolor: '#1E1F25',
        boxShadow: 24,
        p: 3,
        borderRadius: '12px',
        border: '1px solid #2A2C32',
        color: '#FFFFFF'
      }}>
        {mode === 'basket' ? (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {basketTitle}
            </Typography>
            <Divider sx={{ borderColor: '#2A2C32', mb: 2 }} />

            <Stack spacing={2} sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: '#8F929A' }}>
                BTC
              </Typography>
              {items.map((item) => (
                <Box key={item.id} sx={{ mb: 2, position: 'relative' }}>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: -10,
                      top: -10,
                      color: '#FF5252',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 82, 82, 0.1)'
                      }
                    }}
                    onClick={() => onRemoveItem && onRemoveItem(item.id)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                    {item.name}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Typography sx={{ color: '#8F929A' }}>
                      {item.btcAmount}
                    </Typography>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography>{item.sats}</Typography>
                      <Typography sx={{ color: '#8F929A' }}>
                        {item.usdAmount}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>

            <Box sx={{ 
              bgcolor: '#2A2C32',
              borderRadius: '8px',
              p: 1.5,
              mb: 2
            }}>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography>Fee Savings</Typography>
                <Box>
                  <Typography>{feeSavings.sats}</Typography>
                  <Typography sx={{ color: '#8F929A' }}>
                    {feeSavings.usdAmount}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              mb: 3,
              px: 0.5
            }}>
              <Typography>Time Estimate</Typography>
              <Typography>{timeEstimate}</Typography>
            </Box>

            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 2,
              mb: 3,
              borderTop: '1px solid #2A2C32'
            }}>
              <Typography sx={{ fontWeight: 600 }}>
                EXPECTED TOTAL
              </Typography>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  {expectedTotal.btc}
                </Typography>
                <Typography sx={{ color: '#8F929A' }}>
                  {expectedTotal.usd}
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={1.5}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: '#2A2C32',
                  color: '#FFFFFF',
                  '&:hover': { borderColor: '#3A3C42' },
                  textTransform: 'none'
                }}
                onClick={onAddAnother}
                disabled={isProcessing}
              >
                ADD ANOTHER
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: '#F9A825',
                  color: '#14181C',
                  '&:hover': { bgcolor: '#FFB83D' },
                  textTransform: 'none'
                }}
                onClick={handleCheckoutClick}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <CircularProgress size={24} sx={{ color: '#14181C' }} />
                ) : (
                  'CHECKOUT'
                )}
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {checkoutTitle}
            </Typography>
            <Divider sx={{ borderColor: '#2A2C32', mb: 2 }} />

            {transactionDetails && (
              <>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 500 }}>
                    Total: {transactionDetails.totalBTC}
                  </Typography>
                  <Typography sx={{ color: '#8F929A' }}>
                    ({transactionDetails.totalUSD})
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#8F929A', mb: 2 }}>
                  Transaction ID: {transactionDetails.transactionId}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#F9A825',
                  backgroundColor: '#2A2C32',
                  borderRadius: '8px',
                  p: 2,
                  textAlign: 'center'
                }}>
                  Your transaction is being processed. You can close this window.
                </Typography>
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: '#F9A825',
                color: '#14181C',
                '&:hover': { bgcolor: '#FFB83D' },
                textTransform: 'none'
              }}
              onClick={onClose}
            >
              CLOSE
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default BasketModal;