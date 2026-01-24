import React, { useMemo, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { ArrowLeft, Link, Linkedin } from 'lucide-react'
import XIcon from '@/components/Other/XIcon'
import { SiDiscord, SiGithub, SiReddit } from '@icons-pack/react-simple-icons'
import { GitHub } from './GitHub'
import { Primary } from './Primary'

const Comp = ({ Component, props }) => <Component {...props} />

const SelectDataSource = () => {
  const [consentCheck, setConsentCheck] = useState(false)
  const consentRef = useRef()
  const consentTextRef = useRef()

  const sections = useMemo(() => [Primary, GitHub], [])
  const [section, setSection] = useState(0)

  const handleGithub = () => {
    if (!consentCheck) {
      consentRef.current.style.borderColor = "red"
      consentTextRef.current.style.color = "red"
      return
    }
    setSection(1)
  }

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
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
      <DialogContent className={"absolute"}>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Select Data Sources</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-6 h-[30vh]'>
          <Comp Component={sections[section]} props={{ consentCheck, setConsentCheck, consentRef, consentTextRef, allDataSources }} />
          {section > 0 && <button className='absolute top-2 left-2 cursor-pointer' onClick={() => setSection(section - 1)}><ArrowLeft className='opacity-45 hover:opacity-100 transition-opacity duration-200' color='black' /></button>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SelectDataSource