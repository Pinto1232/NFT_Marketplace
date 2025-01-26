import { BasketItem } from '../ui/basketModal/BasketModal.types';
import { TransactionDetails } from './dashboard.types';

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
};

export const calculateTransactionDetails = (basketItems: BasketItem[]): TransactionDetails => {
  const staticFees = { btc: "0.0005", usd: "20.00" };
  return {
    totalBTC: (basketItems.reduce((acc, item) => acc + parseFloat(item.btcAmount), 0) + parseFloat(staticFees.btc)).toFixed(4),
    totalUSD: (basketItems.reduce((acc, item) => acc + parseFloat(item.usdAmount.replace('$', '')), 0) + parseFloat(staticFees.usd)).toFixed(2),
    transactionId: 'txn_' + Math.random().toString(36).substr(2, 9)
  };
};

export const createDynamicItem = (asset: any, conversionRate: number) => ({
  id: asset.id,
  title: asset.name || "Unnamed Asset",
  price: {
    btc: ((asset.floorAsk?.price?.amount?.usd || 0) / conversionRate).toFixed(4),
    usd: (asset.floorAsk?.price?.amount?.usd || 0).toFixed(2)
  },
  quantity: asset.tokenCount || "1",
  imageUrl: asset.image || '/placeholder-nft.png',
  date: asset.contractDeployedAt || asset.createdAt || new Date().toISOString(),
  floorPriceETH: (asset.floorAsk?.price?.amount?.native?.toFixed(4) || 'N/A')
});

