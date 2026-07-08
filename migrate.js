const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = "postgresql://postgres:Project%$6987&^@db.vfovpxgzvtuaeweyxfry.supabase.co:5432/postgres";

const client = new Client({
  connectionString,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to Supabase Postgres!');

    // Create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        rating NUMERIC NOT NULL,
        icon TEXT,
        "imageUrl" TEXT,
        bg TEXT,
        cat TEXT NOT NULL,
        colors JSONB NOT NULL,
        "desc" TEXT NOT NULL
      );
    `);
    console.log('Created products table.');

    // Clear existing data (if any)
    await client.query('DELETE FROM products;');

    // Read local data
    const dataPath = path.join(__dirname, 'data', 'products.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const products = JSON.parse(rawData);

    // Insert data
    let inserted = 0;
    for (const p of products) {
      await client.query(`
        INSERT INTO products (id, name, price, rating, icon, "imageUrl", bg, cat, colors, "desc")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [p.id, p.name, p.price, p.rating, p.icon, p.imageUrl, p.bg, p.cat, JSON.stringify(p.colors), p.desc]);
      inserted++;
    }

    console.log(`Successfully migrated ${inserted} products to Supabase!`);

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.end();
  }
}

run();
