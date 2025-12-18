/* eslint-disable react-hooks/immutability */
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Html = ({ segmentRefs, progress, onReady }) => {

    const segments = [
        {
            height: "screen"
        },
        {
            title: "AI is not what you think"
        },
        {
            height: "[70vh]"
        },
        {
            title: "So does Social Media?"
        },
        {
            title: "Meet John"
        }
    ]

    progress.current = useRef(segments.map(() => 0)) // arr of 0s

    useGSAP(() => { // For updating progress and triggerRef for sync in with R3F
        segments.forEach((_, i) => {
            const triggerRef = segmentRefs.current[i]
            if (i == segments.length - 1) onReady() // If it is last..
            if (!triggerRef) return
            gsap.to(triggerRef, {
                scrollTrigger: {
                    trigger: triggerRef,
                    start: "top center",
                    end: "bottom center",
                    onUpdate: (e) => progress.current[i] = e.progress,
                    onEnter: () => console.log(`Entered ${i}`),
                    onLeave: () => console.log(`Leaved ${i}`)
                }
            })
        })
    })

    useGSAP(() => { // For fade in effect in 1st segment only
        gsap.fromTo(segmentRefs.current[1], { opacity: 0 }, {
            opacity: 1,
            duration: 2,
            scrollTrigger: {
                trigger: segmentRefs.current[1],
                start: "top top",
                end: "bottom center",
                scrub: true,
                pin: true
            }
        })
    }, [segmentRefs])

    return (
        <div className='flex overflow-x-hidden flex-col relative z-10 pointer-events-none'>
            {segments.map((segment, i) => {
                if (segment.title) { // Real titles
                    return (
                        <div className='h-screen flex justify-center items-center text-5xl font-semibold' key={i} ref={(el) => segmentRefs.current[i] = el}>
                            {segment.title}
                        </div>
                    )
                } else { // Just gaps with height param
                    return (
                        <div className={`h-${segment.height}`} key={i} ref={(el) => segmentRefs.current[i] = el}></div>
                    )
                }
            })}
        </div>
    )
}

export default Html