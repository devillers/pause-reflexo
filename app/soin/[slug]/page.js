// app/soin/[slug]/page.js
import { connectDb }    from '../../../lib/db.mjs';
import Soin             from '../../../models/Soin.mjs';
import Link             from 'next/link';
import { notFound }     from 'next/navigation';
import SoinPageClient   from './page.client';

export const runtime = 'nodejs';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDb();
  const soin = await Soin.findOne({ slug });
  return { title: soin?.title || 'Non trouvé' };
}

export default async function SoinPage({ params }) {
  const { slug } = await params;
  await connectDb();
  const soin = await Soin.findOne({ slug });
  if (!soin) return notFound();

  const data = JSON.parse(JSON.stringify(soin));
  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">{soin.title}</h1>
      {soin.image && (
        <img
          src={soin.image}
          alt={soin.title}
          className="w-full h-auto rounded-lg"
        />
      )}
      {soin.category && (
        <p>
          <strong>Catégorie :</strong> {soin.category}
        </p>
      )}
      {/* Nouveaux champs */}
      {soin.prix && (
        <p>
          <strong>Prix :</strong> {soin.prix}
        </p>
      )}
      {soin.duree && (
        <p>
          <strong>Durée :</strong> {soin.duree}
        </p>
      )}
      <div className="prose">
        <p>{soin.description}</p>
      </div>

      <div className="flex space-x-4">
        <Link
          href={`/soin/${soin.slug}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Modifier ce soin
        </Link>
        <SoinPageClient soin={data} />
      </div>
    </div>
  );
}
