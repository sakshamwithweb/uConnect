"use client"
import { Character } from '@/components/Character'
import { FadeIn } from '@/components/Fade'
import React from 'react'

// Tour Page: 
const page = () => {
  return (
    <div className='bg-black h-screen text-white'>
      <FadeIn/>
      <Character />
      <div className='absolute z-10 top-6/12 left-6/12 -translate-6/12 flex flex-col items-center gap-8 pointer-events-none'>
        <h1 className='text-6xl font-bold'>More Coming Soon</h1>
      </div>
    </div>
  )
}

export default page