//ap/page.js

import Image from 'next/image';
import { connectDb } from '../lib/db.mjs';
import User          from '../models/User.mjs';
import HeroHeader from './components/HeroHeader';

export default async function Home() {
  await connectDb();
  const users = await User.find();

  return (
    <main className="relative">
      <HeroHeader/>
      <section>

        <div className="container mx-auto px-4 py-8">
             <ul className="py-4">
          <li>
            <h3 className="text-center text-5xl sm:text-3xl md:text-5xl uppercase font-thin">
              présentation de nos soins
            </h3>
          </li>
          <li>
            <h2 className="text-center text-xl sm:text-3xl my-4  md:text-2xl uppercase font-thin text-[#006778]">
              réflexologie – shiatsu – massages
            </h2>
          </li>
          <li>
            <h4 className="text-center my-4 text-md sm:text-3xl md:text-3xl uppercase font-thin">
              une approche globale du bien-être
            </h4>
          </li>
        </ul>
        </div>
      </section>
     
      {/* <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {users.map((user) => (
          <li key={user._id} className="flex items-center gap-4 p-4 border rounded shadow-sm">
            <Image
              src={user.avatarUrl || '/default-avatar.png'}
              alt={user.name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </li>
        ))}
      </ul> */}
    </main>
  );
}
