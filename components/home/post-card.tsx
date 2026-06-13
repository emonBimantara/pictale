import { User, Bookmark, Heart, MapPin } from "lucide-react"
import { getRelativeTime } from "@/app/utils/date";
import { getLocation } from "@/app/utils/location";

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

export default async function PostCard({ storyData }: PostCardProps) {
    const hasLocation = storyData.lat !== null
        && storyData.lon !== null
        && storyData.lat !== undefined
        && storyData.lon !== undefined;

    let locationText = ""
    if (hasLocation) {
        locationText = await getLocation(storyData.lat!, storyData.lon!)
    }

    return (
        <div className="m-3 rounded-lg border border-gray-300 lg:w-full">
            <div className="p-5 flex gap-4 items-center justify-between">

                <div className="flex gap-4 items-center">
                    <User size={26} className="text-gray-600" />
                    <div>
                        <p className="font-semibold text-md ">{storyData.name}</p>
                        <p className="text-xs text-[#777586] mt-0.5">
                            {getRelativeTime(storyData.createdAt)}
                        </p>
                    </div>
                </div>

                {hasLocation && (
                    <div className="ml-auto flex items-center gap-1 text-xs text-[#626070] bg-gray-50 px-2.5 py-1.5 rounded-full font-medium">
                        <MapPin size={12} className="shrink-0 text-gray-500" />
                        <span className="truncate max-w-[120px] sm:max-w-[200px]">{locationText}</span>
                    </div>
                )}

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