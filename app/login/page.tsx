import LoginForm from "@/components/login-form/login-form";

export default function Login() {
    return (
        <div className='min-h-screen w-full bg-[#FBF8FF] p-6'>
            <div className="text-center flex flex-col gap-2 mb-10">
                <h1 className='text-[#2A14B4] font-bold text-5xl lg:text-4xl'>PicTale</h1>
                <p className="text-[#464554] text-xl lg:text-md">Join the vibe</p>
            </div>

            <div className="lg:flex lg:items-center lg:justify-center">
                <LoginForm />
            </div>
        </div>
    )
}