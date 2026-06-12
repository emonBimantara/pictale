import { Button } from "@/components/ui/button"

export default function WelcomeCard() {
    return (
        <div className="m-5 flex flex-col gap-4 p-5 bg-[#F4F2FD] rounded-lg border border-gray-300 w-100 h-70">
            <h1 className="font-bold text-2xl text-[#2A14B4]">Welcome to Pictale</h1>

            <div>
                <p>
                    You're browsing in Guest Mode. Sign in to curate your
                    own feed, save inspiration, and connect with other
                    creators.
                </p>
            </div>


                <div className="flex flex-col gap-2">
                    <Button type="submit" className="bg-[#2A14B4] hover:bg-[#1f0f8f] transition py-5 text-white text-md cursor-pointer">
                        Create Account
                    </Button>

                    <Button type="submit" className="bg-[#F4F2FD] hover:bg-[#e6e1ff] transition border border-gray-700 py-5 text-black text-md cursor-pointer">
                        Sign In
                    </Button>
                </div>

        </div>
    )
}