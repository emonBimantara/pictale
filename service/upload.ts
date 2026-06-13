interface UploadStoryPayload {
    token: string
    description: string
    photo: File
    lat?: number | null
    lon?: number | null
}

export async function uploadStory({ token, description, photo, lat, lon }: UploadStoryPayload) {
    const formData = new FormData()
    formData.append("description", description)
    formData.append("photo", photo)
    
    if (lat !== null && lat !== undefined) formData.append("lat", lat.toString())
    if (lon !== null && lon !== undefined) formData.append("lon", lon.toString())

    const resp = await fetch('https://story-api.dicoding.dev/v1/stories', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        },
        body: formData
    })

    const respData = await resp.json()
    return respData
}