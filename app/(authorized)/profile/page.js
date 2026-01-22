import Navigator from '@/components/authorized/Navigator'
import React from 'react'

const page = () => {
    return (
        <div className='flex min-h-screen'>
            <Navigator />
            <div className='w-[97%]'>
                Profile
            </div>
        </div>
    )
}

export default page