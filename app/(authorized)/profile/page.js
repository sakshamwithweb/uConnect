"use client"
import Navigator from '@/components/authorized/Navigator'
import Form from '@/components/authorized/profile/Form'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [prevUserInfo, setPrevUserInfo] = useState({})
    const [userInfo, setUserInfo] = useState({})

    const getUserInfos = async () => {
        const req = await fetch("/api/authorized/userInfos")
        const res = await req.json()
        if (!res?.success || !res?.userInfos) return
        setUserInfo(res?.userInfos)
        setPrevUserInfo(res?.userInfos)
        console.log(res?.userInfos)
    }

    const saveUserInfos = () => {
        console.log("Here it will be checked if user made any changed then saved")
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getUserInfos()
    }, [])

    return (
        <div className='flex min-h-screen'>
            <Navigator />
            <div className='w-[97%] flex flex-col justify-center items-center p-8'>
                {(userInfo && prevUserInfo) && <Form userInfo={userInfo} setUserInfo={setUserInfo} />}
                <Button onClick={saveUserInfos} className={"w-full"}>Save</Button>
            </div>
        </div>
    )
}

export default Page