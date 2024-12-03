'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Session } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface ProfileData {
  username: string
  bio: string
  expertise: string
  hourly_rate: number
}

export function Profile({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileData>({
    username: '',
    bio: '',
    expertise: '',
    hourly_rate: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('username, bio, expertise, hourly_rate')
        .eq('id', session.user.id)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      const { error } = await supabase.from('profiles').upsert({
        id: session.user.id,
        ...profile,
        updated_at: new Date(),
      })

      if (error) {
        throw error
      }

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          id="username"
          type="text"
          value={profile.username || ''}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
        <Textarea
          id="bio"
          value={profile.bio || ''}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          rows={3}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise</label>
        <Input
          id="expertise"
          type="text"
          value={profile.expertise || ''}
          onChange={(e) => setProfile({ ...profile, expertise: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="hourly_rate" className="block text-sm font-medium text-gray-700">Hourly Rate</label>
        <Input
          id="hourly_rate"
          type="number"
          value={profile.hourly_rate || ''}
          onChange={(e) => setProfile({ ...profile, hourly_rate: parseFloat(e.target.value) })}
        />
      </div>

      <div>
        <Button
          onClick={updateProfile}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </div>

      <div>
        <Button
          onClick={() => supabase.auth.signOut()}
          className="mt-4"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}

