import { User, Bookmark, Heart } from "lucide-react"

interface PostCardProps {
    storyData: {
        id: string,
        name: string,
        description: string,
        photoUrl: string,
        createdAt: string
    }
}

export default function PostCard({ storyData }: PostCardProps) {
    return (
        <div className="m-3 rounded-lg border border-gray-300 lg:w-full">
            <div className="p-5 flex gap-4 place-items-center">
                <User size={26} className="text-gray-600" />
                <div>
                    <p className="font-semibold text-md ">{storyData.name}</p>
                    <p className="text-md text-[#777586]">
                        {new Date(storyData.createdAt).toLocaleDateString('id-ID')}
                    </p>
                </div>
            </div>

            <img
                src={storyData.photoUrl}
                alt={`Story by ${storyData.name}`}
                className="w-full"
            />

            <div className="flex flex-col gap-3 py-5 px-3">
                <div className="flex gap-2">
                    <Heart size={24} className="text-gray-600" />
                    <Bookmark size={24} className="text-gray-600" />
                </div>

                <div>
                    <p>
                        <span className="font-semibold mr-2">{storyData.name}</span>
                        {storyData.description}
                    </p>
                </div>
            </div>
        </div>
    )
}