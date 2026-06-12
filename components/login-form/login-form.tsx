'use client'

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hook/use-auth"

export default function LoginForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        isLoading, errorMsg, successMsg,
        handleLogin,
        handleRegister
    } = useAuth()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (isLogin) {
            handleLogin()
        } else {
            handleRegister(() => setIsLogin(true))
        }
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setUsername('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className="bg-white py-10 px-5 rounded-lg border border-gray-400 lg:w-[80%]">

            <div className="text-center flex flex-col gap-1 mb-10">
                <h1 className='font-bold text-3xl lg:text-2xl text-black'>
                    {isLogin ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-[#464554] text-md">
                    {isLogin ? "Sign in to continue your visual journey" : "Start curating your visual narrative"}
                </p>
            </div>
            {successMsg && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-md font-medium">
                    {successMsg}
                </div>
            )}

            {isLogin && errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md font-medium">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                {!isLogin && (
                    <div className="flex flex-col gap-1 mb-2">
                        <label className="text-black font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="chimaKeraz"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                            className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A14B4]"
                        />
                    </div>
                )}

                <div className="flex flex-col gap-1 mb-2">
                    <label className="text-black font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                        className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A14B4]"
                    />
                </div>

                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-black font-medium">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                            className="w-full mt-2 px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A14B4]"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer mt-1"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <Button type="submit" disabled={isLoading} className="bg-[#2A14B4] hover:bg-[#1f0f8f] transition w-full py-5 text-white">
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        isLogin ? "Login" : "Register"
                    )}
                </Button>
            </form>

            <hr className="my-5" />

            <div className="text-center">
                <p className="text-md text-black">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        onClick={toggleMode}
                        className="font-bold text-[#2A14B4] cursor-pointer hover:underline"
                    >
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>
            </div>

        </div>
    )
}