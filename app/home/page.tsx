import PostCard from "@/components/home/post-card"
import RecentlyCreator from "@/components/home/recently-creator"
import WelcomeCard from "@/components/home/welcome-card"
import { Button } from "@/components/ui/button"
import { Camera, Bookmark, LogOut, HomeIcon } from "lucide-react"
import { getStories } from "@/service/story"

import { cookies } from 'next/headers'
import Link from "next/link"

export default async function Home() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    let stories: any[] = []

    if (token?.value) {
        try {
            stories = await getStories(token.value)
        } catch (err) {
            console.log("Failed to fetch stories")
        }
    }

    return (
        <div className="bg-[#FBF8FF] min-h-screen pb-20 lg:pb-0">
            <nav className="p-5 flex items-center justify-between border-b bg-white sticky top-0 z-40">
                <h1 className='text-[#2A14B4] font-bold text-4xl'>PicTale </h1>
                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-6 font-medium text-gray-600">
                        <Link href="/collection" className="hover:text-[#2A14B4] transition">Collection</Link>
                    </div>

                    <form action="/api/logout" method="POST">
                        <Button type="submit" className="bg-red-600 hover:bg-red-700 transition py-5 text-white text-md cursor-pointer">
                            Logout
                        </Button>
                    </form>
                </div>
            </nav>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 z-50 shadow-md">
                <Link href="/home" className="flex flex-col items-center text-[#2A14B4]">
                    <HomeIcon size={22} />
                    <span className="text-xs font-semibold">Home</span>
                </Link>

                <Link href="/create" className="flex flex-col items-center text-gray-500 hover:text-[#2A14B4] transition">
                    <Camera size={22} />
                    <span className="text-xs">Create</span>
                </Link>

                <Link href="/collection" className="flex flex-col items-center text-gray-500 hover:text-[#2A14B4] transition">
                    <Bookmark size={22} />
                    <span className="text-xs">Collection</span>
                </Link>
            </div>

            <div className="flex gap-5 p-3">
                <div className="flex flex-col">
                    {stories.length > 0 ? (
                        stories.map((story: any) => (
                            <PostCard key={story.id} storyData={story} />
                        ))
                    ) : (
                        <p className="text-gray-500">
                            No stories yet. Please sign in to view or create stories.
                        </p>
                    )}
                </div>

                <div className="hidden lg:block">
                    <WelcomeCard />
                    <RecentlyCreator stories={stories} />
                </div>

            </div>
        </div>
    )
}