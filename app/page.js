import Image from 'next/image';
import { connectDb } from '../lib/db.mjs';
import User          from '../models/user.mjs';

export default async function Home() {
  await connectDb();
  const users = await User.find();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
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
      </ul>
    </main>
  );
}
