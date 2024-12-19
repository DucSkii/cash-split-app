'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

interface PaymentGroup {
  admins: string[]
  created_at: Date
  description?: string
  members: string[]
  title: string
  totals: Record<string, number>
}

export const useUserGroups = (userID: string | null) => {
  const [groups, setGroups] = useState<PaymentGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userID) {
      setGroups([])
      setLoading(false)
      return
    } // This check is for when userID is null, which might be the case when the page first loads

    const fetchGroups = async () => {
      setLoading(true)
      try {
        const q = query(
          collection(db, 'payment_groups'),
          where('members', 'array-contains', userID)
        )
        // Query is created to check the payment_groups and look for ones that contain the user ID in the member arrays

        const querySnapshot = await getDocs(q)
        // We get all the docs

        const fetchedGroups: PaymentGroup[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as PaymentGroup[]
        // Map through the docs which creates a new array of doc.data(), this will be an array of objects of type PaymentGroup

        setGroups(fetchedGroups)
      } catch (error) {
        console.log('Error fetching groups', error)
        setError('Error fetching groups')
      } finally {
        setLoading(false)
        // Loading will be set to false after either case
      }
    }

    fetchGroups()
  }, [userID]) // We check everytime the userID changes because userID might be null initially, this won't cause issues because userID rarely changes

  return { groups, loading, error }
}
