import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Html = ({ setSegment, segmentRef }) => {
    useGSAP(() => {
        gsap.to(segmentRef?.current, {
            opacity: 1,
            duration: 5,
            scrollTrigger: {
                trigger: segmentRef?.current,
                start: "top center",
                end: "+=1000px",
                onEnter: () => { setSegment(1) },
                pin: true,
                scrub: 1
            }
        })
    })


    return (
        <div className='flex overflow-x-hidden flex-col relative z-10 pointer-events-none'>
            <div className='h-[70vh]'></div>
            <div ref={segmentRef} className='text-5xl opacity-0 text-center font-semibold'>
                <p>AI is not what you think</p>
            </div>
            <div className='h-[400vh]'></div>

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