'use client'

import { useState } from 'react'

// This would typically come from an API
const experts = [
  { id: 1, name: 'Alice Johnson', expertise: 'Software Development', price: 100 },
  { id: 2, name: 'Bob Smith', expertise: 'Digital Marketing', price: 80 },
  { id: 3, name: 'Carol Williams', expertise: 'Financial Planning', price: 120 },
]

export default function Browse() {
  const [selectedExpert, setSelectedExpert] = useState(null)

  const handleBook = (expert) => {
    setSelectedExpert(expert)
    // In a real application, you would initiate the booking process here
    alert(`Booking a session with ${expert.name}. You'll be notified once they confirm.`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Browse Experts</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {experts.map((expert) => (
          <div key={expert.id} className="border rounded-md p-4">
            <h2 className="text-xl font-semibold">{expert.name}</h2>
            <p className="text-gray-600">{expert.expertise}</p>
            <p className="text-lg font-bold mt-2">${expert.price}/hour</p>
            <button
              onClick={() => handleBook(expert)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Book Session
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

