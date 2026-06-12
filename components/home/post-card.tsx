import { User, Bookmark, Heart } from "lucide-react"

export default function PostCard() {
    return (
        <div className="m-5 rounded-lg border border-gray-400 lg:w-[70%]">
            <div className="p-5 flex gap-4 place-items-center">
                <User size={26} className="text-gray-600" />
                <div>
                    <p className="font-semibold text-md ">Shelmond_Krenz</p>
                    <p className="text-md text-[#777586]">2 hours ago</p>
                </div>
            </div>

            <img
                src="https://picsum.photos/200"
                alt="random"
                className="w-full"
            />

            <div className="flex flex-col gap-3 py-5 px-3">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Heart size={24} className="text-gray-600" /> 2.4k
                    </div>

                    <Bookmark size={24} className="text-gray-600" />
                </div>

                <div>
                    <p>
                        <span className="font-semibold">Shelmond_Krenz </span>
                        Morning light catching the minimal textures
                        of the new studio setup. Sometimes less
                        truly is more
                    </p>
                </div>
            </div>
        </div>
    )
}