'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../../lib/firebase'

const Dashboard = () => {
  const router = useRouter()

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
