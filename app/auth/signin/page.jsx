// app/auth/signin/page.jsx
'use client'

import { useEffect, useState } from 'react'
import { signIn, useSession }  from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const { data: session } = useSession()
  const router            = useRouter()
  const params            = useSearchParams()
  const errorFromUrl      = params.get('error')

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // If already signed in, redirect to /admin
  useEffect(() => {
    if (session) router.replace('/admin')
  }, [session, router])

  // Show error message if NextAuth redirected back with error
  useEffect(() => {
    if (errorFromUrl) setErrorMessage('Email ou mot de passe invalide')
  }, [errorFromUrl])

  const handleSubmit = async e => {
    e.preventDefault()
    setErrorMessage('')

    // Let NextAuth handle the redirect on success or failure
    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/admin',
      email,
      password
    })
  }

  // Don't render the form while session is loading or redirecting
  if (session) return null

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Se connecter</h1>
        {errorMessage && (
          <p className="text-red-600 text-sm text-center">{errorMessage}</p>
        )}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connexion
        </button>
      </form>
    </main>
  )
}
