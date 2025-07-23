import React from 'react'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div className="bg-[#E0D058] flex flex-col justify-around px-2 py-1 h-full">
        <Link href="/" className="text-white hover:bg-yellow-400 hover:rounded-4xl hover:py-1 hover:px-2">Home</Link>
        <Link href="/demo" className="text-white hover:bg-yellow-400 hover:rounded-4xl hover:py-1 hover:px-2">Piano</Link>
        <Link href="/earTraining" className="text-white hover:bg-yellow-400 hover:rounded-4xl hover:py-1 hover:px-2">Ear Trainer</Link>
    </div>
  )
}

export default SideBar