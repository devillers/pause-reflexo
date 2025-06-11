'use client'

import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SignInForm() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useSearchParams()
  const errorFromUrl = params.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (status === 'authenticated') router.replace('/admin')
  }, [status, router])

  useEffect(() => {
    if (errorFromUrl) setErrorMessage('Email ou mot de passe invalide')
  }, [errorFromUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/admin',
      email,
      password,
    })
  }

  if (status === 'loading' || status === 'authenticated') return null

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2  text-white">
      {/* Formulaire centré */}
      <div className="flex items-center justify-center px-6 sm:px-12 lg:px-24 py-12">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-light text-gray-800">Connexion</h1>

          {errorMessage && (
            <p className="text-red-400 text-sm">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-light text-gray-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-gray-600 sm:text-sm/6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-light text-gray-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-gray-600 sm:text-sm/6"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-800">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox accent-[#009992]" />
                <span>Se souvenir de moi</span>
              </label>
              <a href="#" className="text-gray-800 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full border border-white] text-gray-800 px-4 py-2 rounded-full text-sm uppercase hover:bg-[#027771] hover:text-white transition"
            >
              Connexion
            </button>
          </form>

          <Link
            href="/"
            className="block text-center text-sm text-gray-800 hover:underline"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* Image uniquement en desktop */}
      <div className="hidden lg:block relative">
        <Image
          src="/images/zen.png"
          alt="Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  )
}
