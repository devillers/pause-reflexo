// app/blog/new/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function makeSlug(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function NewPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    slug: '',
    file: null,
  })

  const handleChange = e => {
    const { name, value, files } = e.target
    if (files) setForm(f => ({ ...f, file: files[0] }))
    else setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('description', form.description)
    fd.append('category', form.category)
    fd.append('slug', makeSlug(form.slug))
    fd.append('file', form.file)

    const res = await fetch('/api/posts', { method: 'POST', body: fd })
    if (!res.ok) {
      console.error('Error', await res.text())
      return
    }
    router.push('/blog')
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-xl mx-auto space-y-4">
      <input
        name="title"
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full p-2 border"
      />
      <input
        name="slug"
        onChange={handleChange}
        placeholder="Slug"
        required
        className="w-full p-2 border"
      />
      <input
        name="category"
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border"
      />
      <textarea
        name="description"
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full p-2 border"
      />
      <input type="file" name="file" accept="image/*" onChange={handleChange} className="w-full" />
      <button type="submit" className="px-4 py-2 bg-black text-white">
        Create Post
      </button>
    </form>
  )
}
