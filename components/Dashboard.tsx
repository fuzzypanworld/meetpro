'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Profile } from './Profile'
import { ExpertList } from './ExpertList'
import { Notifications } from './Notifications'
import { Session } from '@supabase/supabase-js'

export function Dashboard() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <Profile session={session} />
      <ExpertList session={session} />
      <Notifications session={session} />
    </div>
  )
}

