import { Notification, PlatformNotification } from './types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Yield Distributed',
    message: 'You received $127.45 in yield rewards',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Season Changed',
    message: 'Current season is now DeFi',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Rebalancing Needed',
    message: 'Your portfolio allocation is drifting',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  },
];

export const mockPlatformNotifications: PlatformNotification[] = [
  {
    id: 'p1',
    type: 'asset_listing',
    title: 'New Asset Listed: JUP',
    message: 'Jupiter (JUP) has been added to the platform. Start earning onchain rewards today.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    read: false,
    metadata: {
      assetSymbol: 'JUP',
    },
  },
  {
    id: 'p2',
    type: 'yield_distribution',
    title: 'Weekly Yield Distribution',
    message: '2,847 $SEAS holders received a total of $127,845 in onchain rewards.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    read: false,
    metadata: {
      distributionAmount: 127845,
    },
  },
  {
    id: 'p3',
    type: 'node_online',
    title: 'New Node Online: Node-47B',
    message: 'Validator node Node-47B is now active and contributing to network security.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    metadata: {
      nodeCount: 1,
    },
  },
  {
    id: 'p4',
    type: 'node_offline',
    title: 'Node Leaving: Node-23A',
    message: 'Validator node Node-23A will be decommissioned in 24 hours. Rewards redistributed.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    read: false,
    metadata: {
      nodeCount: 1,
    },
  },
  {
    id: 'p5',
    type: 'asset_listing',
    title: 'New Asset Listed: PYTH',
    message: 'Pyth Network (PYTH) is now available for alternative yield strategies.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    read: true,
    metadata: {
      assetSymbol: 'PYTH',
    },
  },
  {
    id: 'p6',
    type: 'yield_distribution',
    title: 'Daily Yield Distribution',
    message: 'Daily onchain yield of $18,234 distributed across 2,847 active holders.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
    metadata: {
      distributionAmount: 18234,
    },
  },
  {
    id: 'p7',
    type: 'node_online',
    title: 'New Nodes Online',
    message: '3 new high-performance validator nodes joined the network.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    read: true,
    metadata: {
      nodeCount: 3,
    },
  },
];