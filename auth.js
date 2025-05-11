// auth.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import bcrypt from 'bcryptjs';

import clientPromise from './lib/mongoClient.mjs';
import { connectDb } from './lib/db.mjs';
import User from './models/User.mjs';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize({ email, password }) {
        await connectDb();
        const user = await User.findOne({ email });
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id:    user._id.toString(),
          name:  user.name,
          email: user.email,
          role:  user.role,
        };
      }
    })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/auth/signin' },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token?.role) session.user.role = token.role;
      return session;
    },
    async redirect() {
      return '/admin';
    }
  }
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);