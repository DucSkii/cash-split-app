'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../lib/firebase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null) // User is of Type User which is provided by firebase, or null
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    }) // If user is authenticated then we set the user

    // Cleanup on unmount
    return () => unsubscribe()
  }, [])

  return { user, loading }
}
