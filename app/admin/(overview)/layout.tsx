import AdminSidebar from '@/app/components/layout/AdminSidebar'
import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
     <div className="flex  h-auto flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <AdminSidebar/>
      </div>
      <div className="flex-grow  p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  )
}

export default layout