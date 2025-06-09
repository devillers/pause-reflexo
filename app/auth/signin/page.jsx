// app/auth/signin/page.jsx
export const dynamic = 'force-dynamic'
export const prerender = false

import SignInForm from './signinForm.jsx'

export default function Page() {
  return <SignInForm />
}
