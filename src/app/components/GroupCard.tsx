import { useUserWithNegativeTotals } from '../hooks/userUserWithNegativeTotals'

interface GroupCardProps {
  id: string
  admins: string[]
  created_at: Date
  description?: string
  members: string[]
  title: string
  totals: Record<string, number>
}

export const GroupCard = (group: GroupCardProps) => {
  const { negativeUsers, loading } = useUserWithNegativeTotals(group.totals)

  return (
    <div>
      <h3>{group.title}</h3>
      <p>{group.description}</p>
      {!loading ? (
        negativeUsers?.map((user, index) => {
          return (
            <div key={index}>
              <p>
                {user.name} owes £{-user.total}
              </p>
            </div>
          )
        })
      ) : (
        <p>...</p>
      )}
    </div>
  )
}
