
export interface NavBarProps {
    brandName: string;
    userBalance: string;
    userWallet: string;
    onNotificationClick?: () => void;
    onMenuItemClick?: (menuItem: string) => void;
    menuItems?: string[];
    className?: string;
  }
  