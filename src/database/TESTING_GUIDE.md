# 🧪 Testing Guide - Step by Step Verification

## ✅ Step 1: Verify Database Schema Created

### Prerequisites:
- [ ] You have executed the SQL commands from `SCHEMA_SETUP_GUIDE.md` Step 1
- [ ] `wallets` table exists in Supabase Dashboard

### Test 1.1: Verify Table Structure

**In Supabase Dashboard SQL Editor**, run:

```sql
-- Check table exists
SELECT 
  table_name,
  table_schema
FROM information_schema.tables 
WHERE table_name = 'wallets';
```

**Expected Output:**
```
table_name | table_schema
-----------|-------------
wallets    | public
```

✅ **Pass:** Table exists  
❌ **Fail:** No rows returned → Go back and execute Step 1 SQL commands

---

### Test 1.2: Verify Columns

```sql
-- Check all columns and their types
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'wallets'
ORDER BY ordinal_position;
```

**Expected Output:**
```
column_name      | data_type                   | is_nullable | column_default
-----------------|-----------------------------|--------------|-----------------
address          | text                        | NO           | NULL
seas_balance     | numeric                     | NO           | 0
node_status      | text                        | NO           | 'no-tokens'::text
activation_date  | timestamp with time zone    | YES          | NULL
created_at       | timestamp with time zone    | NO           | now()
updated_at       | timestamp with time zone    | NO           | now()
```

✅ **Pass:** All 6 columns present with correct types  
❌ **Fail:** Missing columns or wrong types → Drop table and recreate

---

### Test 1.3: Verify Indexes

```sql
-- Check indexes
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'wallets'
ORDER BY indexname;
```

**Expected Output:**
```
indexname                  | indexdef
---------------------------|--------------------------------------------------
idx_wallets_active         | CREATE INDEX idx_wallets_active ON wallets ...
idx_wallets_node_status    | CREATE INDEX idx_wallets_node_status ON wallets ...
wallets_pkey               | CREATE UNIQUE INDEX wallets_pkey ON wallets ...
```

✅ **Pass:** 3 indexes exist (primary key + 2 custom)  
❌ **Fail:** Missing indexes → Run CREATE INDEX commands again

---

## ✅ Step 1.4: Test Backend Health Endpoint

### Test Backend Connection to Database

**Open your browser or use curl:**

```bash
# Test health endpoint
curl https://egmcjbsgooytcdocyyhz.supabase.co/functions/v1/make-server-025e2792/health
```

**Expected Response (SUCCESS):**
```json
{
  "status": "ok",
  "timestamp": "2026-02-06T15:30:00.000Z",
  "services": {
    "api": "operational",
    "database": "operational",
    "kv_store": "operational"
  },
  "version": "1.0.0"
}
```

✅ **Pass:** `"database": "operational"`  
⚠️ **Warning:** `"database": "degraded"` → Table may not exist or connection issue  
❌ **Fail:** `"database": "error"` → Check logs in Supabase Functions

---

### Test in Browser DevTools Console:

```javascript
// Open your Seasons dashboard and run in console:
fetch('https://egmcjbsgooytcdocyyhz.supabase.co/functions/v1/make-server-025e2792/health')
  .then(r => r.json())
  .then(data => {
    console.log('Health Check:', data);
    if (data.services.database === 'operational') {
      console.log('✅ Database connection OK!');
    } else {
      console.error('❌ Database connection FAILED:', data);
    }
  });
```

---

## ✅ Step 1.5: Verify Frontend Still Works

### Important: Frontend should NOT be affected by database changes

**Test Checklist:**

1. **Open Dashboard:** Navigate to https://your-app-url.com
   - [ ] Page loads without errors
   - [ ] No console errors about database
   - [ ] UI shows mock data as before

2. **Check Browser Console:** Press F12 → Console tab
   - [ ] No error messages
   - [ ] No failed network requests
   - [ ] Application logs look normal

3. **Test Navigation:**
   - [ ] Click "Dashboard" → Page loads
   - [ ] Click "Yield Overview" → Page loads
   - [ ] Click "My Node" → Page loads
   - [ ] Click "Assets" → Page loads

4. **Test Wallet Connection (Mock):**
   - [ ] Click "Connect Wallet" button
   - [ ] Select any wallet provider
   - [ ] Mock connection succeeds
   - [ ] Dashboard shows mock data

**All tests passing?**
✅ **Success!** Frontend is unaffected. Database setup complete.  
❌ **Failure?** Check console errors and review changes.

---

## 🔧 Troubleshooting

### Issue: Health endpoint returns "database": "error"

**Possible causes:**
1. Table `wallets` doesn't exist yet
2. Supabase environment variables not set
3. Service role key incorrect

**Debug steps:**
```sql
-- In Supabase SQL Editor, check if table exists:
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'wallets'
);
-- Should return: true
```

**Check backend logs:**
1. Go to Supabase Dashboard
2. Navigate to Edge Functions
3. Click on `server` function
4. View logs for error messages

---

### Issue: Frontend shows errors after database setup

**This should NOT happen!** Database changes should be transparent to frontend.

**If you see errors:**
1. Check browser console for error messages
2. Verify no changes were made to frontend files
3. Try hard refresh (Ctrl+Shift+R)
4. Clear browser cache

**If errors persist:**
- Revert backend changes
- Report issue before proceeding

---

## ✅ Step 1 Complete Checklist

Before proceeding to Step 2, verify:

- [ ] ✅ Table `wallets` created successfully
- [ ] ✅ All 6 columns present with correct types
- [ ] ✅ 3 indexes created
- [ ] ✅ Health endpoint returns `"database": "operational"`
- [ ] ✅ Frontend still works without errors
- [ ] ✅ Mock data still displays correctly
- [ ] ✅ No console errors in browser

**All checks passed?** 🎉 **Step 1 COMPLETE!** 

Proceed to Step 2: Create `nodes` table.

---

## 📸 Expected Screenshots

### Supabase Dashboard - Tables View:
```
Tables:
├── kv_store_025e2792  (existing)
└── wallets            (new! ← you should see this)
```

### Supabase Dashboard - wallets Table Structure:
```
Columns:
- address (text, primary key)
- seas_balance (numeric, default: 0)
- node_status (text, default: 'no-tokens')
- activation_date (timestamptz, nullable)
- created_at (timestamptz, default: now())
- updated_at (timestamptz, default: now())
```

### Browser Console - Health Check:
```javascript
{
  status: "ok",
  services: {
    api: "operational",
    database: "operational",  // ← Should be "operational"
    kv_store: "operational"
  }
}
```

---

## 🚨 Safety Verification

**Critical checks before proceeding:**

1. **Data Safety:** No existing data should be lost
   - [ ] `kv_store_025e2792` table still exists
   - [ ] Any data in KV store is intact

2. **Frontend Safety:** Application still works
   - [ ] All pages load
   - [ ] No errors in console
   - [ ] Mock data displays

3. **Backend Safety:** API still responds
   - [ ] Health endpoint returns 200 OK
   - [ ] No errors in backend logs

**All safety checks passed?** ✅ Safe to proceed to Step 2.

---

## 📞 Support

If you encounter any issues:

1. **Check logs** in Supabase Dashboard → Edge Functions → server → Logs
2. **Check console** in browser DevTools (F12)
3. **Review SQL** in Supabase Dashboard → SQL Editor → History
4. **Rollback if needed:** Drop the `wallets` table and start over

**Remember:** It's better to stop and investigate issues than to proceed with errors!
