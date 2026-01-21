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

export const assets: Asset[] = [
  // Blue Chips (60% total) - 6 assets
  {
    id: 'bonk',
    name: 'Bonk',
    symbol: 'BONK',
    category: 'blue-chip',
    allocation: 10,
    marketCap: '$2.1B',
    price: 0.000028,
    change24h: 5.2,
    description: 'Community-driven Solana memecoin',
  },
  {
    id: 'dogwifhat',
    name: 'dogwifhat',
    symbol: 'WIF',
    category: 'blue-chip',
    allocation: 10,
    marketCap: '$1.8B',
    price: 1.85,
    change24h: 3.1,
    description: 'Dog-themed memecoin on Solana',
  },
  {
    id: 'popcat',
    name: 'Popcat',
    symbol: 'POPCAT',
    category: 'blue-chip',
    allocation: 10,
    marketCap: '$1.2B',
    price: 0.52,
    change24h: -2.3,
    description: 'Cat meme token',
  },
  {
    id: 'mew',
    name: 'Cat in a dogs world',
    symbol: 'MEW',
    category: 'blue-chip',
    allocation: 10,
    marketCap: '$890M',
    price: 0.0089,
    change24h: 4.7,
    description: 'Feline memecoin revolution',
  },
  {
    id: 'myro',
    name: 'Myro',
    symbol: 'MYRO',
    category: 'blue-chip',
    allocation: 10,
    marketCap: '$145M',
    price: 0.145,
    change24h: 1.2,
    description: 'Community memecoin',
  },
  {
    id: 'ponke',
    name: 'Ponke',
    symbol: 'PONKE',
    category: 'blue-chip',
    allocation: 10,
    marketCap: '$280M',
    price: 0.28,
    change24h: -1.5,
    description: 'Monkey-themed memecoin',
  },

  // Underdogs (30% total) - 3 assets
  {
    id: 'samo',
    name: 'Samoyedcoin',
    symbol: 'SAMO',
    category: 'underdog',
    allocation: 10,
    marketCap: '$125M',
    price: 0.012,
    change24h: 6.8,
    description: 'Solana ecosystem dog coin',
  },
  {
    id: 'cope',
    name: 'Cope',
    symbol: 'COPE',
    category: 'underdog',
    allocation: 10,
    marketCap: '$58M',
    price: 0.058,
    change24h: -3.2,
    description: 'Trading community token',
  },
  {
    id: 'slerf',
    name: 'Slerf',
    symbol: 'SLERF',
    category: 'underdog',
    allocation: 10,
    marketCap: '$92M',
    price: 0.092,
    change24h: 8.1,
    description: 'Emerging Solana memecoin',
  },

  // Rising Stars (10% total) - 1 asset
  {
    id: 'fartcoin',
    name: 'Fartcoin',
    symbol: 'FART',
    category: 'rising-star',
    allocation: 5,
    marketCap: '$45M',
    price: 0.045,
    change24h: 12.5,
    description: 'New generation memecoin',
  },
  {
    id: 'jbmb',
    name: 'Just Be More Bullish',
    symbol: 'JBMB',
    category: 'rising-star',
    allocation: 5,
    marketCap: '$32M',
    price: 0.032,
    change24h: 18.7,
    description: 'Bullish mindset memecoin',
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