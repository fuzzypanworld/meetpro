'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [expertise, setExpertise] = useState('')
  const [price, setPrice] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log({ name, bio, expertise, price })
    alert('Profile updated successfully!')
    router.push('/browse')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="bio" className="block mb-1">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="expertise" className="block mb-1">Expertise</label>
          <input
            type="text"
            id="expertise"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">Price per hour ($)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            min="0"
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Save Profile
        </button>
      </form>
    </div>
  )
}

