import React from 'react';
import { Box, IconButton, Typography, Grid, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import { FiAlignLeft } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import NotificationsIcon from '@mui/icons-material/Notifications';

const DashboardContent: React.FC<{ toggleSidebar: () => void; isSidebarOpen: boolean }> = ({
    toggleSidebar,
    isSidebarOpen,
}) => {
    const items = [
        { title: 'Orange Ranger', price: '0.002 BTC', quantity: '10' },
        { title: 'Founder Drop Vault', price: '0.003 BTC', quantity: '15' },
        { title: 'Halloween Drop Vault', price: '0.004 BTC', quantity: '12' },
        { title: 'Alien Drop Vault', price: '0.002 BTC', quantity: '20' },
        { title: 'Digitek Drop Vault', price: '0.001 BTC', quantity: '25' },
    ];

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screens

    return (
        <Box sx={{ backgroundColor: '#14181C', color: '#FFFFFF', minHeight: '100vh' }}>
            {/* Top Navbar */}
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
                {/* Left Section: Hamburger Menu and Title */}
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

                {/* Right Section: Wallet Info and Notification */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: isSmallScreen ? 1 : 2,
                    }}
                >
                    {/* Wallet Info */}
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

                        {/* Wallet Address */}
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
                    {/* Notification Icon */}
                    <IconButton sx={{ color: '#FFFFFF' }}>
                        <NotificationsIcon />
                    </IconButton>
                </Box>

            </Box>

            {/* Main Content */}
            <Box sx={{ padding: 3, marginTop: '60px' }}>
                <Typography variant="h4" gutterBottom>
                    NFT Marketplace
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Listings: {items.length}
                </Typography>
                <Grid container spacing={isSmallScreen ? 2 : 3}>
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ backgroundColor: '#1E1F25', color: '#FFFFFF' }}>
                                <CardContent>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography variant="body2">Price: {item.price}</Typography>
                                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default DashboardContent;
