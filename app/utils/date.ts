export function getRelativeTime(dateString: string): string {
    const now = new Date()
    const past = new Date(dateString)
    const diffInMs = now.getTime() - past.getTime()

    const diffInMins = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMins < 1) return "Baru saja"
    if (diffInMins < 60) return `${diffInMins} menit lalu`
    if (diffInHours < 24) return `${diffInHours} jam lalu`
    return `${diffInDays} hari lalu`
}