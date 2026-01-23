import { HomeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navigator = () => {
    return (
        <div className='w-[3%] flex flex-col justify-between py-8 items-center border-r-2'>
            <Link href={"/dashboard"} className=''><HomeIcon size={30} /></Link>
            <Link href={"/profile"}>
                <Image src={"pfp.svg"} width={30} height={30} alt="pfp" />
            </Link>
        </div>
    )
}

export default Navigator