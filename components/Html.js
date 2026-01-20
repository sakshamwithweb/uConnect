import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { Fragment, useMemo } from 'react'
import { Button } from './ui/button'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Html = ({ segmentRefs, progress, onReady }) => {
    const segments = useMemo(() => [
        { height: "100vh", type: "gap" },
        { title: "AI is not what you think", type: "heading", fade: true, pin: true },
        { height: "200vh", type: "gap" },
        { title: "So does Social Media?", type: "heading", fade: true, pin: true },
        { height: "50vh", type: "gap" },
        { title: "Meet John", type: "heading" },
        { title: "He is a Programmer", type: "heading" },
        { title: "he is looking for team for new project", type: "heading" },
        { title: "He thinks his idea is revolutionary!", type: "heading" },
        { title: "But his dev friends don't", type: "heading" },
        { title: "So he started traveling", type: "heading" },
        { title: "through different networking site, social media site", type: "heading" },
        { title: "With the hope he finds like minded people", type: "heading" },
        { title: "What if we can convert the hope to something better?", type: "heading" }
    ], [])

    if (!progress.current) progress.current = segments.map(() => 0) // arr of 0s

    useGSAP(() => {
        let readyCount = 0
        segments.forEach((seg, i) => {
            const triggerRef = segmentRefs.current[i]
            if (!triggerRef) return
            readyCount++
            if (readyCount == segments.length) onReady() // If it is last..
            // For getting data
            ScrollTrigger.create({
                trigger: triggerRef,
                start: "top center",
                end: "bottom center",
                onUpdate: (e) => progress.current[i] = e.progress,
                onEnter: () => console.log(`Entered ${i}`),
                onLeave: () => console.log(`Leaved ${i}`)
            })

            // For fade effect and pin
            if (seg.fade) {
                ScrollTrigger.create({
                    trigger: segmentRefs.current[i],
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    pin: seg.pin == true,
                    animation: gsap.fromTo(segmentRefs.current[i], { opacity: 0 }, { opacity: 1 })
                })
            }
        })
    }, [])

    return (
        <div className='flex overflow-x-hidden flex-col relative z-10 pointer-events-none'>
            {segments.map((segment, i) => {
                if (segment.type == "heading") {
                    if (i == segments.length - 1) {
                        // Last segment(heading) must have Get Started Btn
                        return (
                            <div ref={(el) => segmentRefs.current[i] = el} key={i} className='h-screen flex flex-col justify-center items-center text-5xl font-semibold gap-4'>
                                <div>{segment.title}</div>
                                <Link className="pointer-events-auto" href={"/login"}>
                                    <Button>Get Started <MoveRight /></Button>
                                </Link>
                            </div>
                        )
                    } else {
                        return <div key={i} className='h-screen flex justify-center items-center text-5xl font-semibold' ref={(el) => segmentRefs.current[i] = el}>{segment.title}</div>
                    }
                } else if (segment.type == "gap") {
                    return <div style={{ height: segment.height }} key={i} ref={(el) => segmentRefs.current[i] = el}></div>
                } else {
                    return null
                }
            })}
        </div>
    )
}

export default Html