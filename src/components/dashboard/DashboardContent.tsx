import React from 'react';
import { Box, IconButton, Typography, Grid, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import { FiAlignLeft } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useOpenseaAssets } from '../../hooks/useOpenseaAssets';

const DashboardContent: React.FC<{ toggleSidebar: () => void; isSidebarOpen: boolean }> = ({
    toggleSidebar,
    isSidebarOpen,
}) => {
    const { data: assets, isLoading, error } = useOpenseaAssets({
        order_direction: 'desc',
        limit: 10, // Adjust as needed
    });

    console.log('data', assets, isLoading, error);
    const items = [
        {
            title: 'Orange Ranger',
            price: '0.002 BTC',
            quantity: '10',
            imageUrl: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F10%2Fbored-ape-yacht-club-nft-3-4-million-record-sothebys-metaverse-0.jpg?w=960&cbr=1&q=90&fit=max', // Replace with actual image URL
        },
        {
            title: 'Founder Drop Vault',
            price: '0.003 BTC',
            quantity: '15',
            imageUrl: 'https://cdn.prod.website-files.com/6615636a03a6003b067c36dd/661ffd0dbe9673d914edca2d_6423fc9ca8b5e94da1681a70_Screenshot%25202023-03-29%2520at%252010.53.43.jpeg', // Replace with actual image URL
        },
        {
            title: 'Halloween Drop Vault',
            price: '0.004 BTC',
            quantity: '12',
            imageUrl: 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/canvas/2024/04/24/a94e2d09-2f19-4bd2-a13f-6d6eff58684c_eadcc3b5.jpg?itok=X0MrjxZs&v=1713940582', // Replace with actual image URL
        },
        {
            title: 'Alien Drop Vault',
            price: '0.002 BTC',
            quantity: '20',
            imageUrl: 'https://coingape.com/wp-content/uploads/2022/12/2_20230102_120403_0001.jpg',
        },
        {
            title: 'Digitek Drop Vault',
            price: '0.001 BTC',
            quantity: '25',
            imageUrl: 'https://www.kfadv.it/wp-content/uploads/Bored_Apes.jpg',
        },
    ];


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

                {/* Right Section: Wallet and Notification */}
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
                            <Card
                                sx={{
                                    backgroundColor: '#1E1F25',
                                    color: '#FFFFFF',
                                    borderRadius: '20px',
                                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    border: '1px solid gray',
                                }}
                            >
                                {/* Price Section */}
                                <Box
                                    sx={{
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
                                    }}
                                >
                                    {item.price}
                                </Box>

                                {/* Image Section */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: '250px',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: '#FFFFFF',
                                            fontSize: '0.8rem',
                                            textAlign: 'start',
                                            display: 'block',
                                            fontWeight: 'bold',
                                            marginTop: '-19px',
                                            padding: '0 10px',
                                        }}
                                    >
                                        IN-GAME
                                    </Typography>
                                </Box>

                                {/* Card Content */}
                                <CardContent
                                    sx={{
                                        textAlign: 'center',
                                        padding: '15px',
                                    }}
                                >
                                    <Box sx={{
                                        padding: '15px',
                                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                                        background: '#303139',
                                        borderRadius: '20px',
                                    }}>

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#FFFFFF',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '0.9rem',
                                                color: '#F9A825',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            QTY: {item.quantity}
                                        </Typography>
                                    </Box>

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
