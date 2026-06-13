import { User, Bookmark, Heart, MapPin } from "lucide-react"
import { getRelativeTime } from "@/app/utils/date";

interface PostCardProps {
    storyData: {
        id: string,
        name: string,
        description: string,
        photoUrl: string,
        createdAt: string,
        lat?: number | null,
        lon?: number | null
    }
}

export default function PostCard({ storyData }: PostCardProps) {
    const hasLocation = storyData.lat !== null
        && storyData.lon !== null
        && storyData.lat !== undefined
        && storyData.lon !== undefined;

    return (
        <div className="m-3 rounded-lg border border-gray-300 lg:w-full">
            <div className="p-5 flex gap-4 place-items-center">
                <User size={26} className="text-gray-600" />
                <div>
                    <p className="font-semibold text-md ">{storyData.name}</p>
                    <div className="flex items-center gap-2 text-xs text-[#777586] mt-0.5">
                        <p>{getRelativeTime(storyData.createdAt)}</p>
                        {hasLocation && (
                            <>
                                <span className="text-gray-400">•</span>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${storyData.lat},${storyData.lon}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-0.5 text-[#2A14B4] hover:underline font-medium"
                                >
                                    <MapPin size={12} className="shrink-0" />
                                    <span>Lihat Lokasi</span>
                                </a>
                            </>
                        )}
                    </div>
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