# 📊 Database Schema Setup Guide for Seasons Platform

## ⚠️ IMPORTANT INSTRUCTIONS

**DO NOT create migration files or DDL statements in code files.** These cannot be executed in the Figma Make environment.

Instead, you must **manually execute these SQL commands** through the Supabase Dashboard UI:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/egmcjbsgooytcdocyyhz/database/tables)
2. Navigate to **SQL Editor**
3. Copy and paste the SQL commands below
4. Execute them one by one

---

## 🎯 Step 1: Create `wallets` Table

This is the first table we're creating. It stores basic wallet information and node status.

### SQL Command:

```sql
-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  address TEXT PRIMARY KEY,
  seas_balance NUMERIC NOT NULL DEFAULT 0,
  node_status TEXT NOT NULL DEFAULT 'no-tokens' CHECK (node_status IN ('no-tokens', 'insufficient', 'active')),
  activation_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for fast lookups by node status
CREATE INDEX IF NOT EXISTS idx_wallets_node_status ON wallets(node_status);

-- Create index for active nodes
CREATE INDEX IF NOT EXISTS idx_wallets_active ON wallets(node_status) WHERE node_status = 'active';

-- Add comment to table
COMMENT ON TABLE wallets IS 'Stores Solana wallet addresses and their $SEAS balance for node activation tracking';

-- Add comments to columns
COMMENT ON COLUMN wallets.address IS 'Solana wallet public key (base58 encoded)';
COMMENT ON COLUMN wallets.seas_balance IS 'Current $SEAS token balance (updated from on-chain data)';
COMMENT ON COLUMN wallets.node_status IS 'Node activation status: no-tokens (<1 $SEAS), insufficient (1-9999 $SEAS), active (10000+ $SEAS)';
COMMENT ON COLUMN wallets.activation_date IS 'Timestamp when wallet first reached 10,000 $SEAS threshold';
```

### Verification:

After executing, verify the table was created:

```sql
-- Check table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'wallets';

-- Check columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'wallets'
ORDER BY ordinal_position;

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'wallets';
```

### Expected Result:

You should see:
- ✅ Table `wallets` exists
- ✅ 6 columns: address, seas_balance, node_status, activation_date, created_at, updated_at
- ✅ 3 indexes: primary key + 2 custom indexes

---

## 🎯 Step 2: Create `nodes` Table (NEXT STEP - DO NOT EXECUTE YET)

This table will store detailed information about activated nodes (wallets with 10,000+ $SEAS).

**⚠️ Wait for Step 2 confirmation before executing this.**

```sql
-- Create nodes table
CREATE TABLE IF NOT EXISTS nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL REFERENCES wallets(address) ON DELETE CASCADE,
  activation_threshold NUMERIC NOT NULL DEFAULT 10000,
  activated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deactivated_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  total_earned_usd NUMERIC NOT NULL DEFAULT 0,
  share_of_pool NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Ensure one active node per wallet
  UNIQUE(wallet_address, is_active) WHERE is_active = TRUE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_nodes_wallet ON nodes(wallet_address);
CREATE INDEX IF NOT EXISTS idx_nodes_active ON nodes(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_nodes_activated_at ON nodes(activated_at DESC);

-- Comments
COMMENT ON TABLE nodes IS 'Tracks activated nodes (wallets holding 10,000+ $SEAS tokens)';
COMMENT ON COLUMN nodes.wallet_address IS 'Reference to wallets table';
COMMENT ON COLUMN nodes.activation_threshold IS 'Minimum $SEAS balance required (currently 10,000)';
COMMENT ON COLUMN nodes.is_active IS 'Whether node is currently active (balance still above threshold)';
COMMENT ON COLUMN nodes.total_earned_usd IS 'Cumulative USD value of all yield distributions received';
COMMENT ON COLUMN nodes.share_of_pool IS 'Current percentage share of total yield pool (0-100)';
```

---

## 📋 Future Tables (Planned)

These will be created in subsequent steps:

### Step 3: `yield_distributions`
Tracks all yield payments to nodes

### Step 4: `portfolio_assets`
Stores user portfolio composition (6:3:1 allocation)

### Step 5: `activities`
Activity feed (rewards, buys, sells, transfers)

### Step 6: `governance_proposals`
Governance voting system

### Step 7: `governance_votes`
Individual votes on proposals

### Step 8: `asset_inclusions`
Inclusion list for assets (Blue Chips, Underdogs, Rising Stars)

### Step 9: `platform_metrics`
Cached platform-wide statistics

---

## 🔒 Security: Row Level Security (RLS)

**⚠️ IMPORTANT:** RLS policies will be added later to ensure users can only access their own data.

For now, we're using the KV store approach which doesn't require RLS since all queries go through the backend Edge Function.

---

## ✅ Verification Checklist

After executing Step 1, verify:

- [ ] Table `wallets` exists in Supabase Dashboard
- [ ] All 6 columns are present with correct types
- [ ] Primary key on `address` column
- [ ] 2 indexes created successfully
- [ ] No errors in SQL Editor
- [ ] Frontend still works (using mock data)

---

## 🆘 Troubleshooting

### Error: "relation 'wallets' already exists"
**Solution:** The table was already created. Skip Step 1 or drop the table first:
```sql
DROP TABLE IF EXISTS wallets CASCADE;
```

### Error: "permission denied"
**Solution:** Make sure you're using the Supabase Dashboard SQL Editor with admin privileges, not the client connection.

### Warning: "table has no data"
**Solution:** This is expected! We haven't inserted any data yet. The backend will populate this table when users connect their wallets.

---

## 📞 Next Steps

Once Step 1 is complete and verified:
1. Confirm table creation successful
2. Move to Step 2: Create `nodes` table
3. Then proceed to Step 3: Update backend to use these tables

**Status:** Waiting for Step 1 execution...
