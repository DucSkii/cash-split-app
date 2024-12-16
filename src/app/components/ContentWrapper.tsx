import React from 'react'

interface ContentWrapperProps {
  children: React.ReactNode
  className?: string
}

const ContentWrapper = ({ children, className = '' }: ContentWrapperProps) => {
  return (
    <div
      className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  )
}

export default ContentWrapper
