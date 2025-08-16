import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <main className='min-h-screen sm:px-10 md:px-20 px-8'>
            <Header />
            <Outlet />
        </main>

        {/* footer */}
        {/* <div className='p-5 flex flex-row gap-2 text bg-gray-950 items-center justify-center text-lg'>

            <div className='text-center'>
                Made by Ajinkya Ladkat 
            </div>

            <div className='text-blue-500'>
                |
            </div>

            <div className='text-[#e1ba60]'>
                <a href="https://github.com/AjinkyaLadkat"> Github</a>
            </div>
        </div> */}

        <div className='mb-14 flex flex-row gap-2 text bg-gray-950 items-center justify-center text-lg'>


        </div>
    </div>
  )
}

export default AppLayout