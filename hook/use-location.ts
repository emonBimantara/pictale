import { useState } from "react"
import { getLocation } from "@/app/utils/location"

export function useLocation() {
    const [lat, setLat] = useState<number | null>(null)
    const [lon, setLon] = useState<number | null>(null)
    const [locationName, setLocationName] = useState<string>("")
    const [isLoadingLocation, setIsLoadingLocation] = useState(false)

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Your browser does not support location feature")
            return
        }

        setIsLoadingLocation(true)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude

                setLat(latitude)
                setLon(longitude)

                const readableName = await getLocation(latitude, longitude)
                setLocationName(readableName)

                setIsLoadingLocation(false)
            },
            (error) => {
                console.error("GPS Error:", error)
                alert("Failed to set location")
                setIsLoadingLocation(false)
            }
        )
    }

    const handleRemoveLocation = () => {
        setLat(null)
        setLon(null)
        setLocationName("")
    }

    return {
        lat,
        lon,
        locationName,
        isLoadingLocation,
        handleGetLocation,
        handleRemoveLocation
    }
}