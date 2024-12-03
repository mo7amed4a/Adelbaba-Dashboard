import React from 'react'

export default function SubHeader({
    children,
    title,
    LeftIcon
}:{
    children?: React.ReactNode;
    title?: string
    LeftIcon?: any
}) {
  return (
    <div className='flex gap-x-4 py-4 items-center justify-between'>
        <div className='flex gap-x-4 items-center'>
            {LeftIcon && LeftIcon}
            <h1 className='text-2xl font-[500]'>{title}</h1>
        </div>
        {children && children}
    </div>
  )
}
