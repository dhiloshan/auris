'use client';

import { useUser, SignedIn, SignedOut, UserButton, SignInButton  } from "@clerk/nextjs"

const Header = () => { 
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-5">
        {user && (
            <h1 className="text-2xl">
                {user?.firstName}{`'s`} Account
            </h1>
        )}

        {/* Breadcrumbs */}
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}
export default Header