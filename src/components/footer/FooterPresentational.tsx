import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { GitHub, Twitter, LinkedIn, Email } from '@mui/icons-material';

interface FooterPresentationalProps {
  currentYear: number;
  footerLinks: { title: string; links: string[] }[];
  socialIcons: { icon: JSX.Element; label: string; url: string }[];
}

const FooterPresentational: React.FC<FooterPresentationalProps> = ({ currentYear, footerLinks, socialIcons }) => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: '#1E1F25',
        color: '#FFFFFF',
        marginTop: 'auto',
        py: 4,
        boxSizing: 'border-box'
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Grid container spacing={4} sx={{ 
          px: { xs: 2, md: 4 },
          maxWidth: 1280,
          margin: '0 auto'
        }}>
          {footerLinks.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.title}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {section.title}
              </Typography>
              {section.links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  color="inherit"
                  display="block"
                  gutterBottom
                  sx={{
                    textDecoration: 'none',
                    '&:hover': { color: '#FF5A5F' }
                  }}
                >
                  {link}
                </Link>
              ))}
            </Grid>
          ))}

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialIcons.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={social.label}
                  sx={{
                    color: '#FFFFFF',
                    '&:hover': { color: '#FF5A5F' }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            pt: 4,
            mt: 4,
            textAlign: 'center',
            width: '100%'
          }}
        >
          <Typography variant="body2">
            © {currentYear} NFT Marketplace. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterPresentational;
