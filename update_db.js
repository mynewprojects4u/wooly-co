const { Client } = require('pg');

const DATABASE_URL = "postgresql://postgres:Project%$6987&^@db.vfovpxgzvtuaeweyxfry.supabase.co:5432/postgres";

async function run() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log("Connected to database.");

    const query = `SELECT "id", "name", "desc" FROM products;`;
    const res = await client.query(query);
    console.log(JSON.stringify(res.rows, null, 2));

  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
}

run();
