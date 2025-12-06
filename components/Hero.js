"use client"

import React, { useState } from 'react'
import { Globe } from './Globe'
import { Button } from './ui/button'
import { FadeIn, FadeOut } from './Fade'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const [tour, setTour] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    const router = useRouter()
    const redirect = () => router.push("/tour")
    return (
        <main className='h-screen flex text-white bg-black relative'>
            {fadeOut ? <FadeOut /> : <FadeIn />}
            <Globe redirect={redirect} tour={tour} setFadeOut={setFadeOut} />
            <div className='absolute z-10 top-6/12 left-6/12 -translate-6/12 flex flex-col items-center gap-8 pointer-events-none'>
                <h2 className='text-5xl'>What if the internet understood you?</h2>
                <div className='flex gap-4'>
                    <Button onClick={() => { setTour(true) }} className={"pointer-events-auto"}>Take a tour</Button>
                    <Button className={"text-black pointer-events-auto"} variant={"outline"}>Skip</Button>
                </div>
            </div>
        </main>
    )
}

export default Hero