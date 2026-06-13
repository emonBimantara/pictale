import { useState } from "react"
import { getLocation } from "@/app/utils/location"

export function useLocation() {
    const [lat, setLat] = useState<number | null>(null)
    const [lon, setLon] = useState<number | null>(null)
    const [locationName, setLocationName] = useState<string>("")
    const [isLoadingLocation, setIsLoadingLocation] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Your browser does not support GPS location features.")
            return
        }

        setIsLoadingLocation(true)
        setSearchResults([])

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
                alert("Failed to get your location automatically. Please type it manually in the search field.")
                setIsLoadingLocation(false)
            }
        )
    }

    const handleSearchLocation = async (query: string) => {
        setSearchQuery(query)

        if (query.trim().length < 3) {
            setSearchResults([])
            return
        }

        setIsSearching(true)

        try {
            const resp = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=id&limit=5`
            )

            if (resp.ok) {
                const data = await resp.json()
                setSearchResults(data)
            }
        } catch (error) {
            console.error("Failed to search location:", error)
        } finally {
            setIsSearching(false)
        }
    }

    const handleSelectLocation = (displayValue: string, latitude: string, longitude: string) => {
        const shortName = displayValue.split(',').slice(0, 2).join(',')

        setLat(parseFloat(latitude))
        setLon(parseFloat(longitude))
        setLocationName(shortName)

        setSearchQuery("")
        setSearchResults([])
    }

    const handleRemoveLocation = () => {
        setLat(null)
        setLon(null)
        setLocationName("")
        setSearchQuery("")
        setSearchResults([])
    }

    return {
        lat,
        lon,
        locationName,
        isLoadingLocation,
        searchQuery,
        searchResults,
        isSearching,
        handleGetLocation,
        handleSearchLocation,
        handleSelectLocation,
        handleRemoveLocation
    }
}