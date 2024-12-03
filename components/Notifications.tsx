'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Session } from '@supabase/supabase-js'
import { useToast } from "@/components/ui/use-toast"

export function Notifications({ session }: { session: Session }) {
  const { toast } = useToast()

  useEffect(() => {
    const bookings = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          if (payload.new.expert_id === session.user.id) {
            toast({
              title: "New Booking Request",
              description: "You have a new booking request!",
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(bookings)
    }
  }, [session, toast])

  return null
}

