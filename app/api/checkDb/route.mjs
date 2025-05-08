// e.g. create `/app/api/checkDb/route.mjs`
export async function GET() {
    console.log('🔥 MONGODB_URI is:', process.env.MONGODB_URI);
    return new Response(null, { status: 204 });
  }
  