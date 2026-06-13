"use client"

import { useLocation } from "@/hook/use-location"
import { X, ImagePlus, MapPin, Loader2 } from "lucide-react"

export default function Create() {
    const {
        lat,
        lon,
        locationName,
        isLoadingLocation,
        handleGetLocation,
        handleRemoveLocation
    } = useLocation()

    return (
        <div className="bg-[#FBF8FF]">
            <div className="p-5 flex items-center justify-between border border-b-2">
                <button className="cursor-pointer">
                    <X size={30} className="text-black" />
                </button>
                <h1 className='text-[#2A14B4] font-bold text-4xl'>
                    PicTale
                </h1>
                <div className="w-[30px]" />
            </div>

            <div className="flex flex-col gap-5 p-5 m-5 border border-gray-300 rounded-md bg-[#FFFFFF]">
                <div>
                    <p className="font-semibold text-xl mb-3">Photo</p>
                    <div className="flex flex-col gap-3 items-center text-center px-5 py-15 border border-gray-500 border-dashed bg-[#FBF8FF] rounded-lg">
                        <ImagePlus size={40} />
                        <div className="flex flex-col gap-2">
                            <p>Click to upload or drag and drop</p>
                            <p className="text-[#464554]">SVG, PNG, JPG or GIF (max 1MB)</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="font-semibold text-xl mb-3">Description</p>
                    <textarea
                        placeholder="Tell the story behind this photo..."
                        className="w-full min-h-[150px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A14B4]"
                        maxLength={300}
                    />
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-xl mb-3">Location (Optional)</p>

                    {!locationName ? (
                        <button
                            type="button"
                            onClick={handleGetLocation}
                            disabled={isLoadingLocation}
                            className="flex items-center gap-2 px-4 py-2.5 border border-[#2A14B4] text-[#2A14B4] rounded-md hover:bg-[#2A14B4]/5 transition font-medium text-sm cursor-pointer disabled:opacity-50"
                        >
                            {isLoadingLocation ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Finding Coordinate...</span>
                                </>
                            ) : (
                                <>
                                    <MapPin size={16} />
                                    <span>Use current location</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-3">
                            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                <MapPin size={18} className="text-[#2A14B4]" />
                                <span>{locationName}</span>
                                <span className="text-xs text-gray-400 font-normal">
                                    ({lat?.toFixed(4)}, {lon?.toFixed(4)})
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemoveLocation}
                                className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}