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
    title: 'New Asset Listed',
    message: 'JTO has been added to the platform',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: 'p2',
    type: 'yield_distribution',
    title: 'Yield Distribution Complete',
    message: 'Weekly yield has been distributed to all holders',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    read: false,
  },
  {
    id: 'p3',
    type: 'node_online',
    title: 'Node Status',
    message: 'Your node is now online and earning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    read: true,
  },
];
