export type BasketModalMode = 'basket' | 'checkout';

export interface BasketItem {
  id: string;
  name: string;
  btcAmount: string;
  sats: string;
  usdAmount: string;
  ethPrice: string;
}

export interface FeeSavings {
  sats: string;
  usdAmount: string;
}

export interface ExpectedTotal {
  btc: string;
  usd: string;
}

export interface TransactionDetails {
  totalBTC: string;
  totalUSD: string;
  transactionId: string;
}

export interface BasketModalProps {
  open: boolean;
  onClose: () => void;
  mode?: BasketModalMode;
  basketTitle?: string;
  items?: BasketItem[];
  feeSavings?: FeeSavings;
  timeEstimate?: string;
  expectedTotal?: ExpectedTotal;
  onAddAnother?: () => void;
  onCheckout?: () => Promise<void>;
  onRemoveItem?: (itemId: string) => void;
  checkoutTitle?: string;
  transactionDetails?: TransactionDetails;
}