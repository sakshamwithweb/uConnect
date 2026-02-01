"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const params = useParams()
    const { slug } = params;

    const [userInfos, setUserInfos] = useState()

    useEffect(() => {
        // fetch data
        // set state
        (async () => {
            const req = await fetch(`/api/authorized/userInfos?type=other&username=${slug}`)
            const { success, error, userInfos } = await req.json()
            if (!success) {
                alert(error || "Something went wrong, try again later")
                return
            }
            console.log(userInfos)
            setUserInfos(userInfos)
        })()
    }, [])

    return (
        <div>
            {userInfos ? <div className='flex justify-center gap-8'>
                <div className='flex flex-col gap-4'>
                    <div className='border rounded-full overflow-hidden p-8'>
                        <Image alt="pfp" width={200} height={200} src={userInfos.pfp} priority />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-center font-bold text-2xl'>{userInfos.username}</div>
                        <div className='text-center font-semibold'>{userInfos.features[0].basic.bio || "Just a GitHub guy"}</div>
                        <div className='text-center'><span className='font-semibold'>Accout Age(GitHub):{" "}</span>{userInfos.features[0].basic?.account_age || "NA"} years</div>
                    </div>
                    <Button onClick={() => alert("dev in progress")}>Talk now</Button>
                </div>
            </div> : "Loading..."}
        </div>
    )
}

export default Page