"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Form from './Form'
import Otp from './Otp'

const Current = ({ Component, props }) => {
    return <Component {...props} />
}

const SignupForm = ({ setEvent, showPswrd, setShowPswrd }) => {
    const [section, setSection] = useState(0)
    const sections = useMemo(() => [Form, Otp], [])
    const [data, setData] = useState({})

    useEffect(() => console.log(data), [data])

    return (
        <div className='w-[60%] border flex flex-col justify-between items-center py-8'>
            <Current Component={sections[section]} props={{ setSection, setEvent, showPswrd, setShowPswrd, setData, data }} />
        </div>
    )
}

export default SignupForm