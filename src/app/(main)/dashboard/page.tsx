'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../../lib/firebase'
import { useAuth } from '@/app/hooks/useAuth'
import { useUserGroups } from '@/app/hooks/useUserGroups'

const Dashboard = () => {
  const router = useRouter()
  const { user, loading } = useAuth()
  const {
    groups,
    loading: groupLoading,
    error,
  } = useUserGroups(user?.uid || null)

  console.log('user', user)
  console.log('groups', groups)

  const handleSignOut = async () => {
    if (!window.confirm('Are you sure you want to sign out?')) return

    try {
      // Firebase signOut.
      await signOut(auth)
      console.log('Signed out successfully')
      document.cookie = 'authToken=; path=/; max-age=0' // Clears the authToken cookie.

      // Redirect to landing page
      router.push('/')
    } catch (err) {
      console.error('Error Signing out:', err)
    }
  }

  if (loading || groupLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='w-full flex items-center justify-between pt-4'>
      <h1 className='text-3xl font-semibold'>Dashboard</h1>
      <button className='rounded py-2 px-4 bg-red-300' onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  )
}

export default Dashboard
