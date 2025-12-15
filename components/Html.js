import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Html = ({ setProgress }) => {
    const section1 = useRef()

    useGSAP(() => {
        gsap.to(section1?.current, {
            opacity: 1,
            duration: 5,
            scrollTrigger: {
                trigger: section1?.current,
                start: "top center",
                markers: true,
                pin: true,
                scrub: 1
            }
        })
    })


    return (
        <div className='flex overflow-x-hidden flex-col relative z-10 pointer-events-none'>
            <div className='h-[70vh]'></div>
            <div ref={section1} className='text-5xl opacity-0 text-center font-semibold'>
                <p>AI is not what you think</p>
            </div>
            <div className='h-[200vh]'></div>

            <div className='text-5xl text-center font-semibold'>
                <p>So does Social Media?</p>
            </div>
            <div className='h-[200vh]'></div>

            <div className='text-5xl text-center font-semibold'>
                <p>Meet John</p>
            </div>
            <div className='h-[200vh]'></div>
        </div>
    )
}

export default Html