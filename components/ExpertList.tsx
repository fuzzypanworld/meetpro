'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Session } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Expert {
  id: string
  username: string
  expertise: string
  hourly_rate: number
}

export function ExpertList({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [experts, setExperts] = useState<Expert[]>([])
  const { toast } = useToast()

  useEffect(() => {
    getExperts()
  }, [])

  async function getExperts() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, expertise, hourly_rate')
        .neq('id', session.user.id)

      if (error) {
        throw error
      }

      if (data) {
        setExperts(data)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  async function bookSession(expertId: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          { user_id: session.user.id, expert_id: expertId, status: 'pending' }
        ])

      if (error) {
        throw error
      }

      toast({
        title: "Success",
        description: "Booking request sent!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book session.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Available Experts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experts.map((expert) => (
          <div key={expert.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{expert.username}</h3>
            <p className="text-gray-600">{expert.expertise}</p>
            <p className="text-lg font-bold mt-2">${expert.hourly_rate}/hour</p>
            <Button onClick={() => bookSession(expert.id)} className="mt-4">
              Book Session
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

