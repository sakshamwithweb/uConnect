"use client"
import Navigator from '@/components/authorized/Navigator'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loading-icons'

const Page = () => {
    const [loading, setLoading] = useState(true)
    const [matches, setMatches] = useState([])

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setLoading(false), [])

    const handleBtnClick = async () => {
        setLoading(true)
        const req = await fetch("/api/authorized/matchVector", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify()
        })
        const res = await req.json()
        setLoading(false)
        if (res.success) {
            setMatches(res.matches)
            alert("pls open console")
            console.log("Sorry for the incomplete project. I spent most of my time learning and debugging R3F as a beginner. Below are the top 5 matches from the embedding. Contact Sak G on Slack if you need help.")
            console.log(res.matches)
            return
        }
        alert("Something went wrong, maybe you didn't added github in profile or else try again later")
    }

    return (
        <div className='flex min-h-screen'>
            <Navigator />
            <div className='w-[97%] flex flex-col gap-8'>
                <div className='h-[50vh] flex justify-center items-end bg-red'>
                    <Button onClick={handleBtnClick} disabled={loading}>Find like minded people {loading && <TailSpin />}</Button>
                </div>
                <div className="w-full border"></div>
                {matches.length == 0 ? <p className='text-center'>No Match found</p> : (
                    <div className='flex flex-col items-center gap-4 pb-4'>
                        {matches.map((matchedUser, idx) => {
                            return <div className='border w-[80%] flex p-4 rounded-xl gap-4' key={idx}>
                                <div>
                                    <Image alt="userPfp" width={60} height={60} src={matchedUser.pfp} />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-bold'>{matchedUser.username}</div>
                                    <div>{matchedUser.features[0].techStack.primary[0]}</div>
                                </div>
                            </div>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page