import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); 

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#14181C' }}>
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        variant={isSmallScreen ? 'temporary' : 'permanent'} 
      />
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DashboardContent toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </Box>
    </Box>
  );
};

export default Dashboard;
