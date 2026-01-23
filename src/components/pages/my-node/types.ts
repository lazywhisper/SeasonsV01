import { UserNode } from '../../../lib/mockData';

export interface MyNodePageProps {
  nodeData: UserNode;
  onBuySeas: () => void;
}

export interface NodeEarningsCardsProps {
  nodeData: UserNode;
}

export interface NodeChartsProps {
  nodeData: UserNode;
}

export interface YieldHistoryTableProps {
  yieldHistory: Array<{
    date: string;
    amount: number;
    txHash: string;
  }>;
}
