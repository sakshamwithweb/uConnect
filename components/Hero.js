"use client"

import React from 'react'
import { Globe } from './Globe'
import { Button } from './ui/button'

const Hero = () => {
    return (
        <main className='h-screen flex text-white bg-black relative'>
            <Globe />
            <div className='absolute z-10 top-6/12 left-6/12 -translate-6/12 flex flex-col items-center gap-8 pointer-events-none'>
                <h2 className='text-5xl'>What if the internet understood you?</h2>
                <div className='flex gap-4'>
                    <Button className={"pointer-events-auto"}>Take a tour</Button>
                    <Button className={"text-black pointer-events-auto"} variant={"outline"}>Skip</Button> {/* Make it later */}
                </div>
            </div>
        </main>
    )
}

export default Hero