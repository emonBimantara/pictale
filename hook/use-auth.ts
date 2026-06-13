import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleLogin = async () => {
        setIsLoading(true)
        setErrorMsg('')
        setSuccessMsg('')

        try {
            const resp = await fetch('https://story-api.dicoding.dev/v1/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const respData = await resp.json()

            if (respData.error) {
                setErrorMsg(respData.message || 'Login failed. Please check your credentials.')
            } else {
                const token = respData.loginResult?.token
                document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax; Secure`

                router.push('/home')
                router.refresh()
            }
        } catch (error) {
            setErrorMsg('Network error occurred while logging in. Please try again.')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegister = async (callbackSuccess: () => void) => {
        setIsLoading(true)
        setErrorMsg('')
        setSuccessMsg('')

        try {
            const resp = await fetch('https://story-api.dicoding.dev/v1/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, email, password }),
            })

            const respData = await resp.json()

            if (respData.error) {
                setErrorMsg(respData.message || 'Registration failed. Please try again.')
            } else {
                setSuccessMsg('Account created successfully. Please sign in to continue.')

                setUsername('')
                setEmail('')
                setPassword('')

                callbackSuccess()
            }
        } catch (error) {
            setErrorMsg('An error occurred during registration.')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        errorMsg,
        successMsg,
        handleLogin,
        handleRegister
    }
}