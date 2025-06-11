// app/api/dashboard/stats/route.js
import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/db.mjs";
import User from "../../../../models/User.mjs";
import Post from "../../../../models/Post.mjs";
import Soin from "../../../../models/Soin.mjs";
import Messages from "../../../../models/Messages.mjs";

/**
 * Récupère les compteurs de chaque collection :
 * - utilisateurs
 * - posts
 * - soins
 * - messages
 */
async function getStatsFromDb() {
  // 1) Se connecter à la BDD (Mongoose)
  await connectDb();

  // 2) Compter les documents dans chaque collection
  const usersCount    = await User.countDocuments();
  const postsCount    = await Post.countDocuments();
  const soinsCount    = await Soin.countDocuments();
  const messagesCount = await Messages.countDocuments();

  return { usersCount, postsCount, soinsCount, messagesCount };
}

export async function GET() {
  try {
    const stats = await getStatsFromDb();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Erreur fetch stats :", error);
    return NextResponse.json(
      { error: "Impossible de charger les statistiques." },
      { status: 500 }
    );
  }
}
