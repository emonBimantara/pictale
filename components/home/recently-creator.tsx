import { User } from "lucide-react";

export default function RecentlyCreator() {
    return (
        <div className="m-5 flex flex-col gap-4">
            <p className="font-semibold text-[#777586]">RECENTLY CREATORS</p>

            <div>
                <div className="p-5 flex gap-4 place-items-center">
                    <User size={26} className="text-gray-600" />
                    <div>
                        <p className="font-semibold text-md ">Shelmond_Krenz</p>
                        <p className="text-md text-[#777586]">2 hours ago</p>
                    </div>
                </div>

                <div className="p-5 flex gap-4 place-items-center">
                    <User size={26} className="text-gray-600" />
                    <div>
                        <p className="font-semibold text-md ">Shelmond_Krenz</p>
                        <p className="text-md text-[#777586]">2 hours ago</p>
                    </div>
                </div>

                <div className="p-5 flex gap-4 place-items-center">
                    <User size={26} className="text-gray-600" />
                    <div>
                        <p className="font-semibold text-md ">Shelmond_Krenz</p>
                        <p className="text-md text-[#777586]">2 hours ago</p>
                    </div>
                </div>
            </div>

        </div>
    )
}