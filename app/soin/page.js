import { connectDb } from "../../lib/db.mjs";
import Soin from "../../models/Soin.mjs";
import HeroHeader from "../components/HeroHeader";
import SoinCard from "../components/SoinCard";

export const runtime = "nodejs";

export default async function SoinPage() {
  await connectDb();
  const soins = await Soin.find().sort({ category: 1, createdAt: -1 }).lean();

  const byCategory = soins.reduce((acc, soin) => {
    const cat = soin.category || "Non classé";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push({
      ...soin,
      _id: soin._id.toString(),
      createdAt: soin.createdAt?.toISOString(),
      updatedAt: soin.updatedAt?.toISOString(),
    });
    return acc;
  }, {});

  return (
    <main>
      <HeroHeader />
      {Object.entries(byCategory).map(([category, catSoins]) => (
        <section key={category} className="max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-thin mb-6">{category}</h2>
          <ul className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {catSoins.map((soin) => (
              <SoinCard key={soin._id} soin={soin} />
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
