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

  const sections = useMemo(() => {
    return {
      Primary,
      GitHub
    }
  }, [])
  const [section, setSection] = useState("Primary")

  const handleDataSourceClicked = (dataSource) => {
    if (!consentCheck) {
      consentRef.current.style.borderColor = "red"
      consentTextRef.current.style.color = "red"
      return
    }
    setSection(dataSource)
  }

  const allDataSources = useMemo(() => [
    {
      name: "GitHub",
      size: 20,
      icon: SiGithub
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
          <Comp Component={sections[section]} props={{ consentCheck, handleDataSourceClicked, setConsentCheck, consentRef, consentTextRef, allDataSources }} />
          {section != "Primary" && <button className='absolute top-2 left-2 cursor-pointer' onClick={() => setSection("Primary")}><ArrowLeft className='opacity-45 hover:opacity-100 transition-opacity duration-200' color='black' /></button>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SelectDataSource