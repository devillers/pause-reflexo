// app/login/page.js
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left - Form */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col justify-center items-center p-8"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Simplify your workflow and boost your productivity with <strong>Tuga’s App</strong>. Get started for free.
        </p>

        <form className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span></span>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or continue with</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <div className="flex gap-4">
          <button className="p-3 border rounded-full hover:bg-gray-100">
            G
          </button>
          <button className="p-3 border rounded-full hover:bg-gray-100">
            
          </button>
          <button className="p-3 border rounded-full hover:bg-gray-100">
            f
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Not a member? <Link href="#" className="text-green-600 hover:underline">Register now</Link>
        </p>
      </motion.div>

      {/* Right - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-1 justify-center items-center bg-green-50"
      >
        <div className="text-center">
          <img src="/images/" alt="Task Management" className="w-80 mx-auto mb-8" />
          <h2 className="text-xl font-semibold mb-2">Make your work easier and organized</h2>
          <p className="text-green-700 font-bold">with Tuga’s App</p>
        </div>
      </motion.div>
    </div>
  )
}
