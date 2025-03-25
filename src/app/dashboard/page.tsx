import ActiveSubscriptions from '@/components/charts/ActiveSubscriptions'
import Revenue from '@/components/charts/Revenue'
import SubHeader from '@/components/layouts/SubHeader'
import OverviewCard from '@/components/template/OverviewCard'
import AxiosServer from '@/lib/axiosServer'
import React from 'react'

export default async function page() {
  const res = await AxiosServer.get('/admin/dashboard')
  const data = res?.data
  return data && (
    <div className='py-4 space-y-4'>
      <SubHeader title="Overview" />
      <OverviewCard data={data} />
      <section className='grid 2xl:grid-cols-8 gap-5'>
      <div className='col-span-6'>
        <Revenue/>
      </div>
        <div className='col-span-2'>
          <ActiveSubscriptions data={data?.activeSubscriptions}/>
        </div>
      </section>
    </div>
  )
}
