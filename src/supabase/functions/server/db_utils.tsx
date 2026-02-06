/**
 * Database Utilities for Seasons Platform
 * 
 * This module provides type-safe database operations using Supabase client.
 * It abstracts common database queries and provides a clean API for the backend.
 */

import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

// ============================================================================
// Database Client Singleton
// ============================================================================

let cachedClient: ReturnType<typeof createClient> | null = null;

/**
 * Get or create Supabase client with service role key
 * Uses caching to avoid creating multiple instances
 */
export function getDbClient() {
  if (!cachedClient) {
    cachedClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return cachedClient;
}

// ============================================================================
// TypeScript Types
// ============================================================================

export interface Wallet {
  address: string;
  seas_balance: number;
  node_status: 'no-tokens' | 'insufficient' | 'active';
  activation_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Node {
  id: string;
  wallet_address: string;
  activation_threshold: number;
  activated_at: string;
  deactivated_at: string | null;
  is_active: boolean;
  total_earned_usd: number;
  share_of_pool: number;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Wallet Operations
// ============================================================================

/**
 * Get wallet by address
 * Returns null if wallet doesn't exist
 */
export async function getWallet(address: string): Promise<Wallet | null> {
  const client = getDbClient();
  
  const { data, error } = await client
    .from('wallets')
    .select('*')
    .eq('address', address)
    .maybeSingle();
  
  if (error) {
    console.error('[DB] Error fetching wallet:', error);
    throw new Error(`Failed to fetch wallet: ${error.message}`);
  }
  
  return data;
}

/**
 * Create or update wallet
 * Uses upsert to handle both insert and update cases
 */
export async function upsertWallet(wallet: Partial<Wallet> & { address: string }): Promise<Wallet> {
  const client = getDbClient();
  
  const walletData = {
    ...wallet,
    updated_at: new Date().toISOString(),
  };
  
  const { data, error } = await client
    .from('wallets')
    .upsert(walletData, {
      onConflict: 'address',
      ignoreDuplicates: false,
    })
    .select()
    .single();
  
  if (error) {
    console.error('[DB] Error upserting wallet:', error);
    throw new Error(`Failed to upsert wallet: ${error.message}`);
  }
  
  return data;
}

/**
 * Update wallet balance and node status
 * Automatically determines node_status based on balance
 */
export async function updateWalletBalance(
  address: string, 
  seasBalance: number
): Promise<Wallet> {
  const client = getDbClient();
  
  // Determine node status based on balance
  let nodeStatus: Wallet['node_status'] = 'no-tokens';
  if (seasBalance >= 10000) {
    nodeStatus = 'active';
  } else if (seasBalance > 0) {
    nodeStatus = 'insufficient';
  }
  
  // Check if this is first time reaching activation threshold
  const existingWallet = await getWallet(address);
  const shouldSetActivationDate = 
    nodeStatus === 'active' && 
    (!existingWallet || !existingWallet.activation_date);
  
  const updates: Partial<Wallet> & { address: string } = {
    address,
    seas_balance: seasBalance,
    node_status: nodeStatus,
    updated_at: new Date().toISOString(),
  };
  
  // Set activation date if crossing threshold for first time
  if (shouldSetActivationDate) {
    updates.activation_date = new Date().toISOString();
  }
  
  const { data, error } = await client
    .from('wallets')
    .upsert(updates, {
      onConflict: 'address',
      ignoreDuplicates: false,
    })
    .select()
    .single();
  
  if (error) {
    console.error('[DB] Error updating wallet balance:', error);
    throw new Error(`Failed to update wallet balance: ${error.message}`);
  }
  
  return data;
}

/**
 * Get all active nodes (wallets with 10k+ SEAS)
 * Used for calculating share of pool
 */
export async function getActiveWallets(): Promise<Wallet[]> {
  const client = getDbClient();
  
  const { data, error } = await client
    .from('wallets')
    .select('*')
    .eq('node_status', 'active')
    .order('seas_balance', { ascending: false });
  
  if (error) {
    console.error('[DB] Error fetching active wallets:', error);
    throw new Error(`Failed to fetch active wallets: ${error.message}`);
  }
  
  return data || [];
}

/**
 * Count wallets by status
 * Used for platform metrics
 */
export async function getWalletStats(): Promise<{
  total: number;
  active: number;
  insufficient: number;
  noTokens: number;
}> {
  const client = getDbClient();
  
  const { data, error } = await client
    .from('wallets')
    .select('node_status');
  
  if (error) {
    console.error('[DB] Error fetching wallet stats:', error);
    throw new Error(`Failed to fetch wallet stats: ${error.message}`);
  }
  
  const stats = {
    total: data?.length || 0,
    active: 0,
    insufficient: 0,
    noTokens: 0,
  };
  
  data?.forEach(wallet => {
    if (wallet.node_status === 'active') stats.active++;
    else if (wallet.node_status === 'insufficient') stats.insufficient++;
    else stats.noTokens++;
  });
  
  return stats;
}

// ============================================================================
// Node Operations (placeholder for Step 2)
// ============================================================================

/**
 * Get node by wallet address
 * Returns the active node for this wallet, or null if none
 * 
 * NOTE: This function will be implemented in Step 2 after nodes table is created
 */
export async function getNodeByWallet(walletAddress: string): Promise<Node | null> {
  // TODO: Implement in Step 2
  console.warn('[DB] getNodeByWallet not yet implemented - nodes table not created');
  return null;
}

// ============================================================================
// Health Check
// ============================================================================

/**
 * Test database connection
 * Used by health check endpoint
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const client = getDbClient();
    
    // Try a simple query
    const { error } = await client
      .from('wallets')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('[DB] Database connection test failed:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('[DB] Database connection test error:', err);
    return false;
  }
}

// ============================================================================
// Error Handling Helper
// ============================================================================

/**
 * Check if error is due to table not existing
 * Used to provide helpful error messages during setup
 */
export function isTableNotFoundError(error: any): boolean {
  return error?.message?.includes('relation') && 
         error?.message?.includes('does not exist');
}
