'use client'

import { useState, useEffect } from 'react'

export default function Notification() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const randomMessage = [
        'New booking request from John Doe',
        'Your session with Alice Johnson is confirmed',
        'You have a new message from Bob Smith',
      ][Math.floor(Math.random() * 3)]

      setMessage(randomMessage)
      setShow(true)

      setTimeout(() => setShow(false), 5000)
    }, 15000)

    return () => clearInterval(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg">
      {message}
    </div>
  )
}

