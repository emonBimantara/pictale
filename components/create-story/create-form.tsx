"use client"

import { useState } from "react"
import { useImage } from "@/hook/use-image"
import { useLocation } from "@/hook/use-location"
import { uploadStory } from "@/service/upload"

import { X, ImagePlus, MapPin, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from "sonner"

import Link from "next/link"
import { useRouter } from "next/navigation"

interface CreateProps {
    token: string
}

export default function CreateForm({ token }: CreateProps) {
    const router = useRouter()

    const {
        lat, lon, locationName, isLoadingLocation, searchQuery,
        searchResults, isSearching, handleGetLocation,
        handleSearchLocation, handleSelectLocation, handleRemoveLocation
    } = useLocation()

    const {
        imageFile, previewUrl, fileInputRef, triggerChooseFile,
        handleFileChange, handleRemoveImage
    } = useImage()

    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!imageFile) {
            toast.error("Please select an image first.")
            return
        }

        if (!description.trim()) {
            toast.error("Please add a description.")
            return
        }

        setIsSubmitting(true)

        try {
            const result = await uploadStory({
                token,
                description,
                photo: imageFile,
                lat,
                lon
            })

            if (result.error) {
                toast.error(result.message || "Failed to post.")
            } else {
                toast.success("Story published successfully")
                router.push("/home")
                router.refresh()
            }
        } catch (error) {
            console.error(error)
            toast.error("A network error occurred. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-[#FBF8FF] min-h-screen">

            <div className="p-5 flex items-center justify-between border border-b-2 bg-white">
                <Link href="/home">
                    <button type="button" className="cursor-pointer">
                        <X size={30} className="text-black" />
                    </button>
                </Link>

                <h1 className='text-[#2A14B4] font-bold text-4xl'>
                    PicTale
                </h1>

                <div className="w-[30px]" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5 m-5 border border-gray-300 rounded-md bg-[#FFFFFF]">

                <div>
                    <p className="font-semibold text-xl mb-3">Photo</p>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {!previewUrl ? (
                        <div
                            onClick={triggerChooseFile}
                            className="flex flex-col gap-4 items-center text-center px-5 py-15 border border-gray-500 border-dashed bg-[#FBF8FF] rounded-lg cursor-pointer hover:bg-gray-50 transition"
                        >
                            <ImagePlus size={40} className="text-gray-500" />
                            <div className="flex flex-col gap-1 text-sm text-gray-600">
                                <p className="font-semibold">Click to upload or drag and drop</p>
                                <p className="text-[#464554]">PNG, JPG, JPEG or GIF (max 1MB)</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full max-h-[400px] border border-gray-200 rounded-lg overflow-hidden bg-black flex justify-center items-center">
                            <img
                                src={previewUrl}
                                alt="Preview upload"
                                className="max-h-[400px] object-contain w-full"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-3 right-3 bg-red-600 p-2.5 text-white rounded-full hover:bg-red-700 transition shadow-md cursor-pointer"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <p className="font-semibold text-xl mb-3">Description</p>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell the story behind this photo..."
                        className="w-full min-h-[150px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A14B4] text-sm"
                        maxLength={300}
                    />
                </div>

                <div className="border-t border-gray-100 pt-4 relative">
                    <p className="font-semibold text-xl mb-3">Location (Optional)</p>

                    {!locationName ? (
                        <div className="flex flex-col gap-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearchLocation(e.target.value)}
                                    placeholder="Search location"
                                    className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A14B4] text-sm"
                                />
                                <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />

                                {isSearching && (
                                    <Loader2 size={18} className="absolute right-3 top-3.5 animate-spin text-gray-400" />
                                )}
                            </div>

                            {searchResults.length > 0 && (
                                <div className="absolute z-50 left-0 right-0 top-[110px] bg-white border border-gray-200 rounded-md shadow-lg max-h-[220px] overflow-y-auto flex flex-col">
                                    {searchResults.map((result: any) => (
                                        <div
                                            key={result.place_id}
                                            onClick={() => handleSelectLocation(result.display_name, result.lat, result.lon)}
                                            className="p-3 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition flex flex-col gap-0.5 text-left"
                                        >
                                            <span className="font-medium text-black truncate">
                                                {result.display_name.split(',')[0]}
                                            </span>
                                            <span className="text-xs text-[#777586] truncate">
                                                {result.display_name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <span className="text-xs text-[#777586]">OR</span>

                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    disabled={isLoadingLocation}
                                    className="flex items-center gap-1.5 text-[#2A14B4] hover:underline font-medium text-xs cursor-pointer disabled:opacity-50"
                                >
                                    {isLoadingLocation ? (
                                        <>
                                            <Loader2 size={12} className="animate-spin" />
                                            <span>Detecting location...</span>
                                        </>
                                    ) : (
                                        <>
                                            <MapPin size={12} />
                                            <span>Use current location</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-3">
                            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                <MapPin size={18} className="text-[#2A14B4]" />
                                <span className="truncate max-w-[180px] sm:max-w-none">{locationName}</span>
                                <span className="text-xs text-gray-400 font-normal hidden sm:inline">
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

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2A14B4] hover:bg-[#1f0f8f] transition py-5 text-white text-md cursor-pointer disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={18} className="animate-spin mr-2" />
                            <span>Posting...</span>
                        </>
                    ) : (
                        <span>Post Story</span>
                    )}
                </Button>
            </form>
            <Toaster richColors position="top-center" />
        </div>
    )
}