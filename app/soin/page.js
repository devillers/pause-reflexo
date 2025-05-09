// app/soin/page.js
import Link         from 'next/link';
import Image        from 'next/image';
import { connectDb } from '../../lib/db.mjs';
import Soin         from '../../models/Soin.mjs';

export default async function SoinPage() {
  // 1) connect to MongoDB
  await connectDb();

  // 2) fetch soins, sorted by category then createdAt
  const soins = await Soin.find()
    .sort({ category: 1, createdAt: -1 })
    .lean();

  // 3) group soins by category
  const byCategory = soins.reduce((acc, soin) => {
    const cat = soin.category || 'Non classé';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(soin);
    return acc;
  }, {});

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Soins par catégorie</h1>

      {Object.entries(byCategory).map(([category, catSoins]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {catSoins.map((soin, i) => (
              <li
                key={soin._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/soin/${soin.slug}`}>                  
                  {soin.image && (
                    <Image
                      src={soin.image}
                      alt={soin.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      priority={i === 0}
                    />
                  )}

<div className="p-4">
  <h3 className="text-xl font-semibold mb-2">{soin.title}</h3>
  <p className="text-gray-600 text-sm line-clamp-3">{soin.description}</p>
  {soin.prix && <p className="text-gray-600 text-sm">Prix : {soin.prix}</p>}
  {soin.duree && <p className="text-gray-600 text-sm">Durée : {soin.duree}</p>}
</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
