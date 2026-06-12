export async function getStories(token: string) {
    const resp = await fetch('https://story-api.dicoding.dev/v1/stories', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        }
    })

    if (!resp.ok) {
        const errorText = await resp.text();
        console.log("=== ERROR ===", errorText.slice(0, 200));
    }

    const respData = await resp.json()
    return respData.listStory
}