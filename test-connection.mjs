import { connectDb } from './lib/db.mjs';

async function test() {
  try {
    const conn = await connectDb();
    console.log('✅ MongoDB connected to', conn.connection.host);
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection error:', err);
    process.exit(1);
  }
}

test();
