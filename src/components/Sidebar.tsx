import React from 'react'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div className="bg-[#E0D058] flex flex-col justify-around px-2 py-1 h-full">
        <Link href="/earTraining" className="text-white hover:bg-yellow-400 rounded-2xl px-1 py-1">Ear Trainer</Link>
    </div>  
  )
}

export default SideBar