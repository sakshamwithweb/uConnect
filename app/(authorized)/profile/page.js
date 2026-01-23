"use client"
import Navigator from '@/components/authorized/Navigator'
import { Input } from '@/components/ui/input'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const Page = () => {
    const [values, setValues] = useState({
        avatar: ""
    })

    const handleAvatarUpload = async (avatar) => {
        const req = await fetch('/api/getSignedUrlForUpload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileName: avatar.name,
                fileType: avatar.type,
            }),
        });
        const res = await req.json()
        if (!res?.success) return
        const signedUrl = res.url
    }

    return (
        <div className='flex min-h-screen'>
            <Navigator />
            <div className='w-[97%] flex justify-center items-center p-8'>
                <div className='w-full min-h-full p-8'>
                    <div className='flex'>
                        <div className='relative'>
                            <div className='pfp border-2 rounded-full overflow-hidden p-5'>
                                <Image src={"pfp.svg"} width={150} height={150} alt="pfp" />
                            </div>
                            <div className='absolute overflow-hidden cursor-pointer -bottom-4 z-10 bg-gray-400 p-4 rounded-full left-17'>
                                <Camera color='white' />
                                <Input onChange={(e) => {
                                    const files = e.target.files
                                    if (files && files[0]) handleAvatarUpload(files[0])
                                }} type={"file"} className={"top-0 opacity-0 left-0 w-full h-full z-50 absolute"} />
                            </div>
                        </div>
                        <div>
                            Personal infos
                        </div>
                    </div>
                    <div>
                        Manage your Data here
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page