import { Dog, TrendingUp, Gamepad2, Image } from 'lucide-react';
import { Season } from './types';

export const getSeasonIcon = (season: Season) => {
  switch (season) {
    case 'MEME':
      return <Dog size={14} style={{ color: '#E9C774' }} />;
    case 'DeFi':
      return <TrendingUp size={14} style={{ color: '#4B80CB' }} />;
    case 'Gaming':
      return <Gamepad2 size={14} style={{ color: '#B44BCB' }} />;
    case 'NFT':
      return <Image size={14} style={{ color: '#F27783' }} />;
  }
};
