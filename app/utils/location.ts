export async function getLocation(lat: number, lon: number): Promise<string> {
    try {
        const resp = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=id`,
            {
                next: { revalidate: 86400 }
            }
        )

        if (!resp.ok) return "Unknown Location"

        const respData = await resp.json()

        const city = respData.city || respData.locality || respData.principalSubdivision || ""
        const country = respData.countryName || ""

        if (!city && !country) return "Mysterious Location"

        return city ? `${city}, ${country}` : country
    } catch (error) {
        console.error("Failed to reverse geocode:", error)
        return "Failed to load location"
    }
}