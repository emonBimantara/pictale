import CreateForm from "@/components/create-story/create-form"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function CreatePage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token?.value) {
        redirect("/login")
    }

    return <CreateForm token={token.value} />
}