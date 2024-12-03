import { Auth } from '@/components/Auth'
import { Dashboard } from '@/components/Dashboard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to MeetPro</h1>
      <Auth />
      <Dashboard />
    </main>
  )
}

