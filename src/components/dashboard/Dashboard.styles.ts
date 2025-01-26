import { Theme } from '@mui/material/styles';

export const dashboardStyles = (theme: Theme, isSmallScreen: boolean, isConnected: boolean) => ({
  root: {
    backgroundColor: '#14181C',
    color: '#FFFFFF',
    minHeight: '100vh'
  },
  header: {
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
    boxSizing: 'border-box'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    ml: { xs: 0, md: 29 }
  },
  marketplaceTitle: {
    fontWeight: 'bold',
    fontSize: isSmallScreen ? '12px' : '1.25rem'
  },
  walletContainer: {
    display: 'flex',
    border: '1px solid rgb(113, 84, 55)',
    borderRadius: '20px',
    padding: 1,
    gap: 1,
    width: 'fit-content',
    backgroundColor: '#1E1F25'
  },
  btcBalance: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '5px 10px',
    borderRadius: '20px',
    gap: 1,
    minWidth: 120
  },
  btcBalanceText: {
    color: '#FFFFFF',
    whiteSpace: 'nowrap' as const,
    fontSize: isSmallScreen ? '0.8rem' : '1rem',
  },
  walletConnect: {
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
  },
  connectionStatus: {
    backgroundColor: isConnected ? '#FFC107' : 'transparent',
    borderRadius: '50%',
    width: 10,
    height: 10,
    mr: 1,
    transition: 'background-color 0.3s'
  },
  walletAddressText: {
    color: '#FFFFFF',
    whiteSpace: 'nowrap' as const,
    fontSize: isSmallScreen ? '0.8rem' : '1rem',
    flex: 1,
    textAlign: 'center' as const,
  },
  web3ButtonWrapper: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
  nftCard: {
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
  },
  mainContentContainer: {
    padding: theme.spacing(3),
    marginTop: '60px',
    ml: 10,
    mr: 10,
  },
    listingsText: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  listingsCount: {
    color: '#F9A825',
  },
  priceBadge: {
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
    gap: '6px'
  },
  nftImage: {
    width: '100%',
    height: 250,
    objectFit: 'cover',
    display: 'block',
    backgroundColor: '#2A2A2A'
  },
  listedBadge: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    color: '#FFFFFF',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  cardContent: {
    textAlign: 'center',
    padding: '15px'
  },
  nftDetails: {
    padding: '15px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
    background: '#303139',
    borderRadius: '20px',
    textAlign: 'left'
  },
  loadingContainer: {
    padding: 3,
    textAlign: 'center'
  }
});