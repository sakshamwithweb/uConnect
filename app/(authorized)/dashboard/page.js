"use client"
import Navigator from '@/components/authorized/Navigator'
import { Button } from '@/components/ui/button'
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
        console.log(res)
        setLoading(false)
    }

    return (
        <div className='flex min-h-screen'>
            <Navigator />
            <div className='w-[97%] flex flex-col justify-center items-center gap-12'>
                <Button onClick={handleBtnClick} disabled={loading}>Find like minded people {loading && <TailSpin />}</Button>
                <div className="w-full border"></div>
                <div>
                    {matches.length == 0 ? <p>No Match found</p> : "Hula match found"}
                </div>
            </div>
        </div>
    )
}

export default Page