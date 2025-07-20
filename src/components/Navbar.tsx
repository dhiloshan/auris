import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="bg-[#E0D058] flex justify-around py-4">
        <Link href="/" className="text-white">Home</Link>
        <Link href="/demo" className="text-white">Piano</Link>
    </div>
  )
}

export default Navbar