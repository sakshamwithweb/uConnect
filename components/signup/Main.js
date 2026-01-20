"use client"
import React, { useMemo, useState } from 'react'
import Form from './Form'
import Otp from './Otp'

const Current = ({ Component, props }) => {
    return <Component {...props} />
}

const SignupForm = ({ setEvent, showPswrd, setShowPswrd }) => {
    const [section, setSection] = useState(0)
    const sections = useMemo(() => [Form, Otp], [])
    return (
        <div className='w-[60%] border flex flex-col justify-between items-center py-8'>
            <Current Component={sections[section]} props={{ setSection, setEvent, showPswrd, setShowPswrd }} />
        </div>
    )
}

export default SignupForm