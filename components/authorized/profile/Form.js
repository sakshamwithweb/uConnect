import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import SelectDataSource from './dialogs/SelectDataSource'
import ViewScrappedData from './dialogs/ViewScrappedData'

const Form = ({ userInfo, setUserInfo }) => {
    const handleAvatarUpload = (avatar) => alert("Sorry we are unable to upload the file as we don't have AWS account for s3")

    return (
        <div className='w-full min-h-full p-4 flex flex-col gap-12'>
            <div className='profile flex border rounded-xl p-8 justify-between'>
                <div className='relative'>
                    <div className='pfp border-2 rounded-full overflow-hidden p-5'>
                        <Image priority src={userInfo.pfp || "/pfp.svg"} width={150} height={150} alt="pfp" />
                    </div>
                    <div className='absolute overflow-hidden cursor-pointer -bottom-4 z-10 bg-gray-400 p-4 rounded-full left-17'>
                        <Camera color='white' />
                        <Input onChange={(e) => {
                            const files = e.target.files
                            if (files && files[0]) handleAvatarUpload(files[0])
                        }} type={"file"} className={"top-0 opacity-0 left-0 w-full h-full z-50 absolute"} />
                    </div>
                </div>
                <div className='w-[80%] flex flex-col justify-around'>
                    <div>
                        <Label htmlFor="username" className={"py-2"}>Username</Label>
                        <Input onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} value={userInfo?.username || ""} id="username" />
                    </div>
                    <Button>Edit Your Persona</Button>
                </div>
            </div>
            <div className='data border rounded-xl p-8 flex flex-col gap-4'>
                <h1 className="text-2xl font-semibold">Manage your Data</h1>
                <div className='flex gap-4'>
                    <SelectDataSource />
                    <ViewScrappedData />
                </div>
            </div>
        </div>
    )
}

export default Form