import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="text-center text-5xl py-4">Home Page</h1>
      <Link href="/earTraining" className="block text-center">
        Click here!
      </Link>
    </>
  )
}