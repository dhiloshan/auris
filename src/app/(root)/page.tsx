import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <h1 className="text-center text-5xl py-4">Home Page</h1>
      <Button>Click me</Button>
    </>
  )
}