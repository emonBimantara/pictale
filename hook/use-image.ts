import { useState, useRef } from "react"

export function useImage() {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    
    const fileInputRef = useRef<HTMLInputElement>(null)

    const triggerChooseFile = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 1024 * 1024) {
                alert("Ukuran kepanjangan, Bre! Maksimal cuma boleh 1MB.")
                return
            }

            setImageFile(file)
            
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleRemoveImage = () => {
        setImageFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = "" 
    }

    return {
        imageFile,
        previewUrl,
        fileInputRef,
        triggerChooseFile,
        handleFileChange,
        handleRemoveImage
    }
}