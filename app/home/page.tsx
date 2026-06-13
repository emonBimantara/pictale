import PostCard from "@/components/home/post-card"
import RecentlyCreator from "@/components/home/recently-creator"
import WelcomeCard from "@/components/home/welcome-card"
import { Button } from "@/components/ui/button"
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
        <div className="bg-[#FBF8FF]">
            <nav className="p-5 flex items-center justify-between border-b">
                <h1 className='text-[#2A14B4] font-bold text-4xl'>
                    PicTale
                </h1>

                <div className="flex items-center gap-2">
                    <Link href="/logout" prefetch={false}>
                        <Button className="bg-red-600 hover:bg-red-700 transition py-5 text-white text-md cursor-pointer">
                            Logout
                        </Button>
                    </Link>

                    <Link href="/create" className="lg:hidden">
                        <Button className="bg-[#2A14B4] hover:bg-[#1f0f8f] transition py-5 text-white text-md cursor-pointer">
                            + Create
                        </Button>
                    </Link>
                </div>
            </nav>

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