# Services Layer Documentation

## Overview

This directory contains the data fetching and API integration layer for the Seasons platform. It provides a clean abstraction between the UI components and data sources (mock or real API).

## Architecture

```
services/
├── api/
│   ├── types.ts         # TypeScript types for API contracts
│   └── seasonsApi.ts    # HTTP client for Seasons API
└── dataService.ts       # Abstraction layer (mock/real data)
```

## Quick Start

### Using in Components

```typescript
import { useDashboardData } from '../hooks/useDashboardData';

function MyComponent() {
  const { data, isLoading, error, refetch } = useDashboardData({
    walletAddress: '7xKX...m2Sz',
    enabled: true,
    refetchInterval: 30000, // Refetch every 30s
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Balance: {data?.wallet.seasBalance} SEAS</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Switching Between Mock and Real Data

Set environment variable in `.env`:

```bash
# Development (mock data)
VITE_USE_MOCK_DATA=true

# Production (real API)
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=https://api.seasons.xyz
```

### Direct Service Usage

```typescript
import { dataService } from '../services/dataService';

// Get dashboard data
const data = await dataService.getDashboardData('7xKX...m2Sz');

// Get specific data
const wallet = await dataService.getWalletData('7xKX...m2Sz');
const yield = await dataService.getYieldMetrics('7xKX...m2Sz');
const portfolio = await dataService.getPortfolio('7xKX...m2Sz');
```

## API Types

### Core Data Types

- **`DashboardData`** - Complete dashboard view (combines all data)
- **`WalletData`** - Wallet balance and basic info
- **`YieldMetrics`** - Current APY, earnings, estimates
- **`PortfolioComposition`** - Asset allocation and breakdown
- **`NodeStatus`** - Node activation state and health
- **`ActivityFeed`** - Recent platform activity
- **`PlatformMetrics`** - Platform-wide statistics

See `/services/api/types.ts` for full type definitions.

## Data Service Methods

### Dashboard

```typescript
getDashboardData(walletAddress: string): Promise<DashboardData>
```

Fetches complete dashboard data in one call.

### Wallet

```typescript
getWalletData(walletAddress: string): Promise<WalletData>
```

Get wallet balance and connection status.

### Yield & Earnings

```typescript
getYieldMetrics(walletAddress: string): Promise<YieldMetrics>
getYieldHistory(walletAddress: string, timeframe: '24h' | '7d' | '30d' | '90d'): Promise<YieldHistory>
```

Get current yield metrics and historical data.

### Portfolio

```typescript
getPortfolio(walletAddress: string): Promise<PortfolioComposition>
```

Get asset allocation and portfolio breakdown.

### Node

```typescript
getNodeStatus(walletAddress: string): Promise<NodeStatus>
```

Check node activation status and health metrics.

### Activity

```typescript
getActivityFeed(limit?: number, cursor?: string): Promise<ActivityFeed>
getUserActivity(walletAddress: string, limit?: number, cursor?: string): Promise<ActivityFeed>
```

Get platform-wide or user-specific activity.

### Platform

```typescript
getPlatformMetrics(): Promise<PlatformMetrics>
```

Get TVL, active nodes, and other platform statistics.

### Governance

```typescript
getGovernanceData(walletAddress?: string): Promise<GovernanceData>
```

Get active proposals and voting power.

## Mock Data Mode

When `VITE_USE_MOCK_DATA=true`, the data service:

1. Returns mock data from `/lib/mockData.ts`
2. Simulates API delays (optional)
3. Generates realistic data patterns
4. Doesn't make real HTTP requests

This is perfect for:
- Development without backend
- Testing UI components
- Demos and prototypes
- Frontend-only development

## Real API Mode

When `VITE_USE_MOCK_DATA=false`, the data service:

1. Makes HTTP requests to `VITE_API_BASE_URL`
2. Handles authentication (if needed)
3. Manages request timeouts
4. Provides error handling

## Error Handling

All methods return Promises and may throw errors:

```typescript
try {
  const data = await dataService.getDashboardData(walletAddress);
} catch (error) {
  if (error.message === 'Request timeout') {
    // Handle timeout
  } else {
    // Handle other errors
  }
}
```

## Request Cancellation

Use `AbortSignal` to cancel requests:

```typescript
const controller = new AbortController();

dataService.getDashboardData(walletAddress, {
  signal: controller.signal
});

// Cancel the request
controller.abort();
```

## Adding New Endpoints

### 1. Add types to `/services/api/types.ts`

```typescript
export interface NewFeature {
  id: string;
  name: string;
  value: number;
}
```

### 2. Add method to `/services/api/seasonsApi.ts`

```typescript
async getNewFeature(id: string): Promise<NewFeature> {
  const response = await this.request<NewFeature>(`/v1/features/${id}`);
  return response.data;
}
```

### 3. Add mock adapter to `/services/dataService.ts`

```typescript
function generateMockNewFeature(id: string): NewFeature {
  return {
    id,
    name: 'Mock Feature',
    value: 42,
  };
}
```

### 4. Add service method

```typescript
async getNewFeature(id: string): Promise<NewFeature> {
  if (this.useMockData) {
    return generateMockNewFeature(id);
  }
  return seasonsApi.getNewFeature(id);
}
```

## Best Practices

1. **Always use the data service** - Don't import mockData directly in components
2. **Use TypeScript types** - Import types from `/services/api/types.ts`
3. **Handle loading states** - Use `useDashboardData` hook for automatic state management
4. **Handle errors gracefully** - Show user-friendly error messages
5. **Use abort signals** - Cancel requests when components unmount
6. **Cache when appropriate** - Use React Query or similar for advanced caching

## Migration from Mock Data

To migrate existing components from direct mock imports:

**Before:**
```typescript
import { mockPortfolioAssets } from '../lib/mockData';

function Portfolio() {
  const assets = mockPortfolioAssets;
  // ...
}
```

**After:**
```typescript
import { useDashboardData } from '../hooks/useDashboardData';

function Portfolio() {
  const { data, isLoading } = useDashboardData({
    walletAddress: userWallet
  });
  
  const assets = data?.portfolio.assets || [];
  // ...
}
```

## Testing

### Unit Tests

```typescript
import { dataService } from './dataService';

describe('DataService', () => {
  it('should fetch dashboard data', async () => {
    const data = await dataService.getDashboardData('test-wallet');
    expect(data).toBeDefined();
    expect(data.wallet.address).toBe('test-wallet');
  });
});
```

### Integration Tests

```typescript
// Set mock mode for tests
dataService.setUseMockData(true);

// Run tests
test('component displays wallet balance', async () => {
  render(<Dashboard walletAddress="test" />);
  await waitFor(() => {
    expect(screen.getByText(/12,547 SEAS/)).toBeInTheDocument();
  });
});
```

## Performance Considerations

1. **Batch requests** - Use `getDashboardData()` instead of multiple individual calls
2. **Set appropriate refetch intervals** - Don't poll too frequently
3. **Cancel unused requests** - Use AbortController when navigating away
4. **Cache static data** - Platform metrics don't change frequently

## Security

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Validate API responses** - Use TypeScript types
3. **Handle sensitive data** - Don't log wallet addresses in production
4. **Use HTTPS** - Always use secure connections in production

## Future Enhancements

- [ ] Add React Query integration for advanced caching
- [ ] Add WebSocket support for real-time updates
- [ ] Add retry logic with exponential backoff
- [ ] Add request deduplication
- [ ] Add response validation with Zod
- [ ] Add request/response interceptors
- [ ] Add analytics tracking
