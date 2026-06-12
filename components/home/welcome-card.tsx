import { Button } from "@/components/ui/button"

export default function WelcomeCard() {
    return (
        <div className="m-3 flex flex-col gap-5 p-5 bg-[#F4F2FD] rounded-lg border border-gray-300 w-100 h-70">
            <h1 className="font-bold text-2xl text-[#2A14B4]">
                Start Sharing Your Story
            </h1>

            <div>
                <p className="text-gray-700">
                    Share your moments, ideas, or inspiration with the world.
                    Every post you create becomes part of your visual journey.
                </p>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
                <Button className="bg-[#2A14B4] hover:bg-[#1f0f8f] transition py-5 text-white text-md cursor-pointer">
                    + Create New Post
                </Button>

                <p className="text-sm text-gray-500 text-center">
                    Express yourself freely
                </p>
            </div>
        </div>
    )
}