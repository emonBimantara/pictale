import { User } from "lucide-react";

interface RecentlyCreatorProps {
    stories: any[]
}

export default function RecentlyCreator({ stories }: RecentlyCreatorProps) {
    const uniqueCreators = stories
        .filter((story, index, self) =>
            self.findIndex(t => t.name === story.name) === index
        )
        .slice(0, 10);

    return (
        <div className="m-5 flex flex-col gap-4">
            <p className="font-semibold text-[#777586]">RECENTLY CREATORS</p>

            <div>
                {uniqueCreators.length === 0 && (
                    <p className="text-sm text-gray-500 p-5">No recent creators.</p>
                )}

                {uniqueCreators.map((creator: any) => (
                    <div key={creator.id} className="pb-6 flex gap-4 place-items-center hover:bg-gray-50 rounded-lg transition">
                        <User size={26} className="text-gray-600" />
                        <div>
                            <p className="font-semibold text-md text-black">{creator.name}</p>
                            <p className="text-xs text-[#777586]">
                                {new Date(creator.createdAt).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}