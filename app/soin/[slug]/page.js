// app/soin/[slug]/page.js
import { notFound } from "next/navigation";
import { connectDb } from "../../../lib/db.mjs";
import Soin from "../../../models/Soin.mjs";
import SoinPageActions from "./actions.client.js";

export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  // Next.js 15 : params est un Promise
  const { slug } = await params;
  await connectDb();
  const soin = await Soin.findOne({ slug });
  return { title: soin?.title || "Soin non trouvé" };
}

export default async function SoinPage({ params }) {
  // Next.js 15 : attendre params avant destructuration
  const { slug } = await params;

  await connectDb();
  const soin = await Soin.findOne({ slug });
  if (!soin) return notFound();

  return (
    <>
      <section className="relative">
        <div
          className="relative z-10 mx-auto justify-center flex flex-col min-h-[540px] p-6 bg-cover bg-center"
          style={{
            backgroundImage: `url(${soin.image || "/images/blog.webp"})`,
          }}
        >
          <h1 className="text-4xl text-[#009992]font-bold">{soin.title}</h1>
        </div>
      </section>
      <article className="p-8 max-w-3xl mx-auto space-y-6">
        <div className="prose prose-lg">
          <p>{soin.description}</p>

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
        </div>

        {/* Ces boutons n’apparaissent que pour un admin connecté */}
        <SoinPageActions slug={slug} />
      </article>
    </>
  );
}
