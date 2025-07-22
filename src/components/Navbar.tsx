import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="bg-[#E0D058] flex justify-around py-4">
        <Link href="/" className="text-white hover:bg-yellow-400 hover:rounded-4xl hover:py-1 hover:px-2">Home</Link>
        <Link href="/demo" className="text-white hover:bg-yellow-400 hover:rounded-4xl hover:py-1 hover:px-2">Piano</Link>
        <Link href="/earTraining" className="text-white hover:bg-yellow-400 hover:rounded-4xl hover:py-1 hover:px-2">Ear Trainer</Link>
    </div>
  )
}

export default Navbar