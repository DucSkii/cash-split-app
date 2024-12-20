'use client'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface NegativeUser {
  name: string
  total: number
}

export const useUserWithNegativeTotals = (
  groupTotals: Record<string, number> | null
) => {
  const [negativeUsers, setNegativeUsers] = useState<NegativeUser[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const findNegativeTotals = async (): Promise<NegativeUser[]> => {
    if (groupTotals == null || Object.keys(groupTotals).length === 0) return [] // If there has been 0 payments then just return

    const userIDsWithNegativeTotals = Object.entries(groupTotals) // Converts the object of key-value pairs into an array
      .filter(([_, total]) => total < 0) // Filters to find where total is less than 0, _ is used as a placeholder because we do not need the userID here
      .map(([userID, total]) => ({ userID, total }))
    // Square brackets are used for array destructuring, this returns us an array of all the userIDs

    try {
      // Creating a batch query to fetch user details
      const userIDs = userIDsWithNegativeTotals.map(({ userID }) => userID)
      const q = query(
        collection(db, 'users'),
        where('__name__', 'in', userIDs) // __name__ refers to the document IDs
      )

      const querySnapshot = await getDocs(q) // retrieving the documents

      // Map user details
      const userDetails = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        first_name: doc.data().first_name,
        last_name: doc.data().last_name,
      }))

      // Combine usernames with their negative totals
      return userIDsWithNegativeTotals.map(({ userID, total }) => {
        const user = userDetails.find((u) => u.id === userID)

        // Returning on the format of First + first letter of Last Name and total they owe
        return {
          name:
            user?.first_name + ` ${user?.last_name[0].toUpperCase()}.` ||
            'Unknown User',
          total,
        }
      })
    } catch (error) {
      console.log('Error fetching usernames:', error)
      setError('Failed to fetch user data.')
      return []
    }
  }

  useEffect(() => {
    const fetchNegativeTotals = async () => {
      const result = await findNegativeTotals()
      setNegativeUsers(result)
      setLoading(false)
    }

    fetchNegativeTotals()
  }, [])

  return { negativeUsers, loading, error }
}
