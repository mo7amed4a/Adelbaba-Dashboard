import SubHeader from '@/components/layouts/SubHeader'
import OverviewCard from '@/components/template/OverviewCard'
import React from 'react'

export default function page() {
  return (
    <div className='py-4'>
      <SubHeader title="Overview" />
      <OverviewCard />
    </div>
  )
}
