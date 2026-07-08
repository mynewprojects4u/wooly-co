const { Client } = require('pg');
const fs = require('fs');

async function runMigration() {
  // Use the postgresql string provided earlier by user
  // postgresql://postgres:Supu$4urudra@db.vfovpxgzvtuaeweyxfry.supabase.co:5432/postgres
  // Wait, I should use process.env.DATABASE_URL if available, but I know the password from the context!
  // Password given by user for owner: Supu$4urudra
  // Or maybe I can use the Supabase JS client to execute raw sql? Supabase JS client cannot execute raw SQL without RPC.
  // Let's use pg.
  const connectionString = 'postgresql://postgres:Project%$6987&^@db.vfovpxgzvtuaeweyxfry.supabase.co:5432/postgres';
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const sql = fs.readFileSync('./supabase_orders_migration.sql', 'utf8');
    await client.query(sql);
    console.log("Migration executed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

runMigration();
