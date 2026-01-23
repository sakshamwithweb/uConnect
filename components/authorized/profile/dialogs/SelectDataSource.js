/* eslint-disable react-hooks/refs */
import React, { useMemo, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Link, Linkedin } from 'lucide-react'
import XIcon from '@/components/Other/XIcon'
import { SiDiscord, SiGithub, SiReddit } from '@icons-pack/react-simple-icons'
import { Checkbox } from '@/components/ui/checkbox'

const SelectDataSource = () => {
  const [consentCheck, setConsentCheck] = useState(false)
  const consentRef = useRef()
  const consentTextRef = useRef()

  const handleGithub = () => {
    if (!consentCheck) {
      consentRef.current.style.borderColor = "red"
      consentTextRef.current.style.color = "red"
      return
    }
    // Run main logic
    console.log("Yeah main logic")
  }

  const allDataSources = useMemo(() => [
    {
      name: "GitHub",
      size: 20,
      icon: SiGithub,
      action: handleGithub
    },
    {
      name: "Twitter",
      size: 20,
      icon: XIcon
    },
    {
      name: "LinkedIn",
      size: 20,
      icon: Linkedin
    },
    {
      name: "Custom",
      size: 20,
      icon: Link
    },
    {
      name: "Discord",
      size: 20,
      icon: SiDiscord
    },
    {
      name: "Reddit",
      size: 20,
      icon: SiReddit
    }
  ], [consentCheck])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Select Data Sources</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Select Data Sources</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-2' onClick={() => setConsentCheck(!consentCheck)}>
            <Checkbox ref={consentRef} className="border-2 cursor-pointer" checked={consentCheck} onCheckedChange={(e) => setConsentCheck(e)} />
            <div ref={consentTextRef} className={"flex items-center cursor-pointer select-none"}>
              I&apos;m aware and allow Uconnect to access my public data.
            </div>
          </div>
          <div className='social-media'>
            <h3 className='font-semibold text-xl'>Social Media</h3>
            <div className='grid grid-cols-4 gap-4 py-4'>
              {allDataSources.map((dataSource, idx) => {
                const Icon = dataSource["icon"]
                return <Button key={idx} {...(dataSource.action && { onClick: dataSource.action })} variant={"outline"} className='border flex rounded-2xl justify-around items-center p-2'>
                  <Icon size={dataSource["size"]} />
                  <span className='font-bold'>{dataSource["name"]}</span>
                </Button>
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SelectDataSource