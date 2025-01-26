export interface AssetData {
  id: string;
  name: string;
  image: string;
  contractDeployedAt: string;
  createdAt: string;
  floorAsk?: {
    price: {
      amount: {
        usd: number;
        native: number;
      };
    };
  };
  tokenCount: string;
}

export interface DynamicItem {
  id: string;
  title: string;
  price: {
    btc: string;
    usd: string;
  };
  quantity: string;
  imageUrl: string;
  date: string;
  floorPriceETH: string;
}

export interface DashboardContentProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export interface TransactionDetails {
  totalBTC: string;
  totalUSD: string;
  transactionId: string;
}