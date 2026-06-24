// components/home/post-card.tsx
import { User, MapPin } from "lucide-react" // 🔥 Bersih dari Heart dan Bookmark
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
        <div className="w-full mb-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden lg:w-full">
            
            {/* 1. HEADER SECTION (Author & Location) */}
            <div className="p-4 flex gap-3 items-center justify-between bg-white">
                <div className="flex gap-3 items-center">
                    {/* Lingkaran Avatar Profile */}
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-gray-800 leading-none">{storyData.name}</p>
                        <p className="text-[11px] text-gray-400 mt-1">
                            {getRelativeTime(storyData.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Badge Lokasi Berwarna Branded Ungu */}
                {hasLocation && (
                    <div className="ml-auto flex items-center gap-1 text-xs text-[#2A14B4] bg-[#F3EEFF] px-3 py-1.5 rounded-full font-medium max-w-[140px] sm:max-w-[220px]">
                        <MapPin size={12} className="shrink-0 text-[#2A14B4]" />
                        <span className="truncate">{locationText}</span>
                    </div>
                )}
            </div>

            {/* 2. IMAGE SECTION */}
            {/* Diberi efek pembatas halus dan zoom in tipis saat di-hover */}
            <div className="w-full bg-gray-50 overflow-hidden border-y border-gray-50 max-h-[480px] flex items-center justify-center">
                <img
                    src={storyData.photoUrl}
                    alt={`Story by ${storyData.name}`}
                    className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-500"
                />
            </div>

            {/* 3. CONTENT SECTION (Caption) */}
            {/* Bersih total dari barisan tombol like/saved */}
            <div className="p-4 bg-white">
                <p className="text-gray-700 text-sm leading-relaxed text-justify">
                    <span className="font-bold text-gray-900 mr-2">{storyData.name}</span>
                    {storyData.description}
                </p>
            </div>

        </div>
    )
}