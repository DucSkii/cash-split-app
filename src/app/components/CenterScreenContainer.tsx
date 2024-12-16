import React from 'react'

interface CenterScreenContainerProps {
  children: React.ReactNode
  className?: string
}

const CenterScreenContainer = ({
  children,
  className = '',
}: CenterScreenContainerProps) => {
  return (
    <div
      className={`h-[100vh] flex justify-center items-center flex-col ${className}`}
    >
      {children}
    </div>
  )
}

export default CenterScreenContainer
