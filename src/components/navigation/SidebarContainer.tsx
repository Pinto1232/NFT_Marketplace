import React, { useState } from 'react';
import SidebarPresentational from './SidebarPresentational';
import { useNavigate } from 'react-router-dom';

interface SidebarContainerProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'permanent' | 'temporary';
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ isOpen, onClose, variant }) => {
  const [walletOpen, setWalletOpen] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('');
  const navigate = useNavigate();

  const toggleWallet = () => setWalletOpen((prev) => !prev);
  const toggleReward = () => setRewardOpen((prev) => !prev);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  const handleLogout = () => {
    handleItemClick('Logout');
    navigate('/');
  };

  return (
    <SidebarPresentational
      isOpen={isOpen}
      onClose={onClose}
      variant={variant}
      walletOpen={walletOpen}
      rewardOpen={rewardOpen}
      activeItem={activeItem}
      toggleWallet={toggleWallet}
      toggleReward={toggleReward}
      handleItemClick={handleItemClick}
      handleLogout={handleLogout}
    />
  );
};

export default SidebarContainer;
