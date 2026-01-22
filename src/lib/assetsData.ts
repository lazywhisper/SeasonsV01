export interface Asset {
  id: string;
  name: string;
  symbol: string;
  category: 'blue-chip' | 'underdog' | 'rising-star';
  allocation: number; // % allocation within category
  marketCap?: string;
  price?: number;
  change24h?: number;
  logo?: string;
  description?: string;
}

import wifLogo from 'figma:asset/695464c4e114211df8930e790b5f1354e020512b.png';
import bonkLogo from 'figma:asset/cabe639e074a7696ad20c8b76102cc7130648803.png';
import penguLogo from 'figma:asset/11dd47e096a75ab72a7e500bcdba8d0d4772e45b.png';
import fartcoinLogo from 'figma:asset/501ffda46bf5d1c0917ca63d14c5b266867ac2e7.png';
import jbmbLogo from 'figma:asset/5f7d06d332fd284477eac1ceb01e315d9b508091.png';

export const assets: Asset[] = [
  // Blue Chips (60% total) - 3 assets at 20% each
  {
    id: 'dogwifhat',
    name: 'dogwifhat',
    symbol: 'WIF',
    category: 'blue-chip',
    allocation: 20,
    marketCap: '$1.8B',
    price: 1.85,
    change24h: 3.1,
    description: 'Dog-themed memecoin on Solana',
    logo: wifLogo,
  },
  {
    id: 'bonk',
    name: 'Bonk',
    symbol: 'BONK',
    category: 'blue-chip',
    allocation: 20,
    marketCap: '$2.1B',
    price: 0.000028,
    change24h: 5.2,
    description: 'Community-driven Solana memecoin',
    logo: bonkLogo,
  },
  {
    id: 'pengu',
    name: 'Pudgy Penguins',
    symbol: 'PENGU',
    category: 'blue-chip',
    allocation: 20,
    marketCap: '$1.4B',
    price: 0.014,
    change24h: 4.7,
    description: 'NFT-backed memecoin',
    logo: penguLogo,
  },

  // Underdogs (30% total) - 1 asset at 30%
  {
    id: 'fartcoin',
    name: 'Fartcoin',
    symbol: 'FARTCOIN',
    category: 'underdog',
    allocation: 30,
    marketCap: '$245M',
    price: 0.245,
    change24h: 12.5,
    description: 'New generation memecoin with viral potential',
    logo: fartcoinLogo,
  },

  // Rising Stars (10% total) - 1 asset at 10%
  {
    id: 'jbmb',
    name: 'Just Be More Bullish',
    symbol: 'JBMB',
    category: 'rising-star',
    allocation: 10,
    marketCap: '$82M',
    price: 0.082,
    change24h: 18.7,
    description: 'Bullish mindset memecoin with strong community',
    logo: jbmbLogo,
  },
];

export const categoryInfo = {
  'blue-chip': {
    name: 'Blue Chips',
    allocation: 60,
    description: 'Established memecoins with proven track record and strong communities',
    color: 'var(--seasons-brand-grad-mid2)',
    bgColor: 'rgba(180, 75, 203, 0.1)',
  },
  'underdog': {
    name: 'Underdogs',
    allocation: 30,
    description: 'Mid-cap tokens with growth potential and active development',
    color: 'var(--seasons-brand-grad-mid1)',
    bgColor: 'rgba(242, 119, 131, 0.1)',
  },
  'rising-star': {
    name: 'Rising Stars',
    allocation: 10,
    description: 'High-risk, high-reward early-stage projects',
    color: 'var(--seasons-brand-grad-start)',
    bgColor: 'rgba(233, 199, 116, 0.1)',
  },
};