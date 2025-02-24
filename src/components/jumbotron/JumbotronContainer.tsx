import React, { useEffect, useState } from 'react';
import { JumbotronProps } from './Jumbotron.types';
import JumbotronPresentational from './JumbotronPresentational';
import { useOpenseaAssets } from '../../hooks/useReservoir';

const JumbotronContainer: React.FC<JumbotronProps> = ({ title, subtitle }) => {
  const { data: assets, isLoading, error } = useOpenseaAssets({ 
    orderDirection: 'desc', 
    limit: 5 
  });
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  console.log('assets data', assets);

  interface Asset {
    banner: string | null;
  }

  const banners: string[] = (assets as Asset[])
    ?.map((asset: Asset) => asset.banner)
    ?.filter((banner: string | null) => !!banner) as string[] || [];

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBannerIndex(prev => (prev + 1) % banners.length);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [banners]);

  if (isLoading) return <div>Loading banners...</div>;
  if (error) return <div>Error loading banners</div>;
  if (banners.length === 0) return <div>No banners available</div>;

  return (
    <JumbotronPresentational 
      title={title} 
      subtitle={subtitle} 
      backgroundImage={banners[currentBannerIndex]} 
    />
  );
};

export default JumbotronContainer;
