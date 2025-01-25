import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';

// Configure WalletConnect
const projectId = '94fb09ee0c7f253b6897a59044a23a88';
const chains: readonly [typeof mainnet] = [mainnet];
const wagmiConfig = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata: {
    name: "NFT Marketplace",
    description: "A marketplace for NFTs",
    url: "https://nftmarketplace.com",
    icons: ["https://nftmarketplace.com/icon.png"]
  }
});
createWeb3Modal({ wagmiConfig, projectId });

// Create React Query client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>,
);