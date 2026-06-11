'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button";

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (isLogin) {
            console.log('LOGIN DATA:', { email, password })
        } else {
            console.log('REGISTER DATA:', { username, email, password })
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

            <form autoComplete="off" onSubmit={handleSubmit}>

                {!isLogin && (
                    <div className="flex flex-col gap-1 mb-2">
                        <label className="text-black">Username</label>
                        <input
                            type="text"
                            placeholder="chimaKeraz"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300"
                        />
                    </div>
                )}

                <div className="flex flex-col gap-1 mb-2">
                    <label className="text-black">Email</label>
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300"
                    />
                </div>

                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-black">Password</label>
                    <input
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300"
                    />
                </div>

                <Button className="bg-[#2A14B4] w-full py-5">
                    {isLogin ? "Login" : "Register"}
                </Button>
            </form>

            <hr className="my-5" />

            <div className="text-center">
                <p className="text-md text-black">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        onClick={toggleMode}
                        className="font-bold text-[#2A14B4] cursor-pointer"
                    >
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>
            </div>

        </div>
    )
}