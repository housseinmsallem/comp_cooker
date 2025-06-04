import LoadingCard from '@/components/ui/loading-card'
import React, { Suspense } from 'react'

const CompsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<LoadingCard />}>
      <div>{children}</div>
    </Suspense>
  )
}

export default CompsLayout
