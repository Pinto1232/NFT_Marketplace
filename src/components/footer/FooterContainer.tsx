import React from 'react';
import FooterPresentational from './FooterPresentational';
import { Email, GitHub, LinkedIn, Twitter } from '@mui/icons-material';

const FooterContainer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: 'Company', links: ['About', 'Careers', 'Contact'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
    { title: 'Resources', links: ['Documentation', 'Blog', 'Help Center'] }
  ];

  const socialIcons = [
    { icon: <GitHub />, label: 'GitHub', url: '#' },
    { icon: <Twitter />, label: 'Twitter', url: '#' },
    { icon: <LinkedIn />, label: 'LinkedIn', url: '#' },
    { icon: <Email />, label: 'Email', url: '#' }
  ];

  return (
    <FooterPresentational 
      currentYear={currentYear} 
      footerLinks={footerLinks} 
      socialIcons={socialIcons} 
    />
  );
};

export default FooterContainer;
