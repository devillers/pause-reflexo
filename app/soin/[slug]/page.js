// app/soin/[slug]/page.js
import { notFound }    from 'next/navigation'
import { connectDb }   from '../../../lib/db.mjs'
import Soin            from '../../../models/Soin.mjs'
import SoinPageActions from './actions.client.js'

export const runtime = 'nodejs'

export async function generateMetadata({ params }) {
  // Next.js 15 : params est un Promise
  const { slug } = await params
  await connectDb()
  const soin = await Soin.findOne({ slug })
  return { title: soin?.title || 'Soin non trouvé' }
}

export default async function SoinPage({ params }) {
  // Next.js 15 : attendre params avant destructuration
  const { slug } = await params

  await connectDb()
  const soin = await Soin.findOne({ slug })
  if (!soin) return notFound()

  return (
    <article className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{soin.title}</h1>

      {soin.image && (
        <img
          src={soin.image}
          alt={soin.title}
          className="w-full h-auto rounded-lg"
        />
      )}

      <div className="prose">
        <p>{soin.description}</p>
      </div>

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

      {/*
        Ces actions (Modifier/Supprimer) ne s'affichent que si
        l'admin est connecté, et redirigent vers /admin/soins/…
      */}
      <SoinPageActions slug={slug} />
    </article>
  )
}
