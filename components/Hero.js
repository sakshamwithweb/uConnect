"use client"

import React from 'react'
import { Globe } from './Globe'


const Hero = () => {


    return (
        <main className='h-[92vh] flex mt-[8vh] text-white bg-black'>
            <div className='w-[40%] z-99'>
                <h2>Lorem Ipsulum CHaracter Hero Nacbar with public dir</h2>
            </div>
            <div className='w-[60%]'>
                <Globe />
            </div>
        </main>
    )
}

export default Hero