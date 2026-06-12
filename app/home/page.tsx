import PostCard from "@/components/home/post-card"
import RecentlyCreator from "@/components/home/recently-creator"
import WelcomeCard from "@/components/home/welcome-card"
import { Button } from "@/components/ui/button"

import { cookies } from 'next/headers'
import Link from "next/link"

export default async function Home() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    const isLoggedIn = !!token


    return (
        <div>
            <nav className="p-5 flex place-item-center justify-between border border-b-5">
                <h1 className='text-[#2A14B4] font-bold text-4xl'>PicTale</h1>
                {isLoggedIn && (
                    <Button className="bg-[#2A14B4] hover:bg-[#1f0f8f] transition w-30 py-5 text-white text-lg cursor-pointer">
                        + Create
                    </Button>
                )}

                {!isLoggedIn && (
                    <Link href="/login">
                        <Button className="bg-[#2A14B4] hover:bg-[#1f0f8f] transition w-35 py-5 text-white text-lg cursor-pointer">
                            Sign In/Up
                        </Button>
                    </Link>
                )}
            </nav>

            <div className="flex">
                <PostCard />

                <div className="hidden lg:block">
                    {!isLoggedIn && <WelcomeCard />}
                    <RecentlyCreator />
                </div>
            </div>
        </div>
    )
}