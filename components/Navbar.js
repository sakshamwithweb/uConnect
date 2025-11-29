import React from 'react'
import { Button } from './ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='z-99 h-[8vh] w-full p-4 fixed top-0 left-0 backdrop-blur-xs'>
        <nav className="h-full flex items-center justify-between">
            <h2 className="font-bold text-2xl"><Link href={"/"}>uConnect</Link></h2>
            <div className='flex gap-4'>
                <Button>Get Started</Button>
                <Button><Github/></Button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar