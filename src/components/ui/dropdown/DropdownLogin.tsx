import React, { useState } from 'react';
import {
    Menu,
    IconButton,
    TextField,
    Button,
    Box,
    Typography,
    InputAdornment,
    Link,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';

export const DropdownLogin = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = () => {

        console.log('Email:', email);
        console.log('Password:', password);
         // Redirect to Dashboard
    navigate('/dashboard');
    handleClose();
    };

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <AccountCircleIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        p: 3,
                        width: 300,
                        borderRadius: 1,
                        marginTop: 2,
                        marginLeft: 7,
                    },
                }}
            >
                <Typography variant="h6" textAlign="center" gutterBottom>
                    Welcome Back
                </Typography>
                <Typography variant="body2" textAlign="center" color="textSecondary" mb={2}>
                    Log in to your account
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Box textAlign="right" mb={2}>
                    <Link href="#" underline="hover" variant="body2">
                        Forgot Password?
                    </Link>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#ff5c5c',
                        borderRadius: 25,
                        color: '#fff',
                        fontWeight: 'bold',
                        py: 1.5,
                        mb: 2,
                        '&:hover': {
                            backgroundColor: '#ff7878',
                        },
                    }}
                    onClick={handleLogin}
                >
                    Log in
                </Button>
                <Typography variant="body2" textAlign="center" color="textSecondary" mb={2}>
                    or login with
                </Typography>
                <Box display="flex" justifyContent="center" gap={2}>
                    <IconButton>
                        <GoogleIcon sx={{ color: '#DB4437' }} />
                    </IconButton>
                    <IconButton>
                        <FacebookIcon sx={{ color: '#4267B2' }} />
                    </IconButton>
                    <IconButton>
                        <TwitterIcon sx={{ color: '#1DA1F2' }} />
                    </IconButton>
                    <IconButton>
                        <LinkedInIcon sx={{ color: '#0077B5' }} />
                    </IconButton>
                </Box>
            </Menu>
        </div>
    );
};
