import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <main className='min-h-screen container'>
            {/* header */}
            <Outlet />
        </main>

        {/* footer */}
        <div className='p-6 flex flex-row gap-2 text bg-gray-900 items-center justify-center text-lg'>

            <div className='text-center'>
                Made by Ajinkya Ladkat 
            </div>

            <div>
                |
            </div>

            <div className='text-blue-600'>
                <a href=""> Github</a>
            </div>
        </div>
    </div>
  )
}

export default AppLayout