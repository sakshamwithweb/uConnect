/* eslint-disable react-hooks/immutability */
"use client"
import LoginCharacters from '@/components/loginCharacter/main'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from "three"

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const pointer = useRef(new THREE.Vector2())
  const plane = new THREE.Plane()
  const planeNormal = new THREE.Vector3(0, 0, 1);
  const planePoint = new THREE.Vector3(0, 0, 0);
  plane.setFromNormalAndCoplanarPoint(planeNormal, planePoint)
  const raycasterRef = useRef()
  const cameraRef = useRef()
  const [showPswrd, setShowPswrd] = useState(false)
  const [event, setEvent] = useState("")

  const handleMouseMove = ({ clientX, clientY }) => {
    pointer.current.x = (clientX / window.innerWidth) * 2 - 1
    pointer.current.y = -((clientY / window.innerHeight) * 2 - 1)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (showPswrd) setEvent("showPassword")
  }, [showPswrd])

  useEffect(() => {
    console.log(event)
  }, [event])

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password || !form.username) {
      setError("All fields are required")
      return
    } else if (form.password.length <= 7) {
      setError("Password length must be 8 or more than 8")
      return
    } else if (form.username.length <= 2) {
      setError("Username length must be 3 or more than 3")
      return
    }
    setError("")
    const req = await fetch("/api/auth/signup", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(form)
    })
    const res = await req.json()
    if (!res.success) return
    alert("Logged in!")
  }

  return (
    <div onMouseMove={handleMouseMove} className='flex min-h-screen'>
      <div className='w-[40%]'>
        <Canvas>
          <LoginCharacters states={{ event: event }} pointer={pointer} raycasterRef={raycasterRef} plane={plane} />
          <ambientLight />
          <raycaster ref={raycasterRef} />
          <OrthographicCamera ref={cameraRef} args={[-5, 5, 5, -5, 0.1, 100]} zoom={100} position={[0, 0, 10]} makeDefault />
        </Canvas>
      </div>
      <div className='w-[60%] border flex flex-col justify-between items-center py-8'>
        <div className='flex flex-col gap-8 w-[50%]'>
          <div className='flex flex-col items-center gap-4'>
            <div className='Icon'>
              <svg width="50px" height="50px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M570.2 842c-50.6 0-278.7-180-278.7-401.9 0-58.8-2.9-133.1-1-183.9-50.8 3.2-91.4 45.7-91.4 97.3v272.1c37.4 194.7 137.5 334 255.2 334 69.5 0 132.9-48.6 180.9-128.5-20.8 7.1-42.6 10.9-65 10.9z" fill="#FFB89A" /><path d="M926.1 191.8C900.5 74.1 817.9 62.1 704.9 62.1c-29.1 0-60.3 0.8-93 0.8-36 0-70.5-1.1-102.5-1.1-109.7 0-189.8 12.5-201.3 123.7-20.4 198.3 30 617.1 306.1 617.1S939 414.3 926.1 191.8z m-76.9 268.5c-9.5 47.9-22.3 90.8-38.1 127.7-16.8 39.2-37 71.4-60 95.8-37.3 39.5-82.1 58.7-137 58.7-53.4 0-97.6-20.1-134.9-61.6-45.5-50.5-79.8-131.5-99-234.2-15.6-83.5-20.3-178.9-12.4-255.2 1.8-17.3 5.7-30.7 11.6-39.8 4.4-6.8 10.1-11.7 18.7-15.8 25.8-12.5 70.8-14.2 111.4-14.2 15 0 30.7 0.2 47.3 0.5 17.8 0.3 36.2 0.6 55.2 0.6 17.2 0 33.9-0.2 50-0.4 15.1-0.2 29.3-0.4 43.1-0.4 44.5 0 89.5 1.8 118 15.1 15.9 7.4 33.4 20.8 43.6 63 2.6 53.3 3.6 153.5-17.5 260.2z" fill="#4E5155" /><path d="M532 841.7c-32.5 22.3-70.6 33.7-113.2 33.7-29.7 0-57.3-6-82.1-17.7-23.2-11-44.7-27.4-63.9-48.7-46-50.9-80.3-131.3-99.2-232.4-15.1-80.6-19.6-172.9-12-246.8 3-29.5 12-50.2 27.5-63.2 14.2-12 35.1-19.2 65.8-22.9 16.5-2 28.2-16.9 26.3-33.3-2-16.5-16.9-28.2-33.3-26.3-42.9 5.1-73.8 16.7-97.4 36.5-27.9 23.5-43.8 57.2-48.5 103-8.2 79.3-3.4 178.1 12.7 264 9.7 51.9 23.4 99.4 40.6 141.2 19.8 48.1 44.4 88.6 73 120.4 51.6 57.2 115.7 86.2 190.6 86.2 55 0 104.5-14.9 147.2-44.2 13.7-9.4 17.1-28.1 7.7-41.7-9.4-13.7-28.1-17.2-41.8-7.8z" fill="#4E5155" /><path d="M519.7 248.5c-16.6 0-30 13.4-30 30v91.3c0 16.6 13.4 30 30 30s30-13.4 30-30v-91.3c0-16.6-13.5-30-30-30zM299.5 385.5c0-16.6-13.4-30-30-30s-30 13.4-30 30v91.3c0 16.6 13.4 30 30 30s30-13.4 30-30v-91.3zM754.6 248.5c-16.6 0-30 13.4-30 30v91.3c0 16.6 13.4 30 30 30s30-13.4 30-30v-91.3c0-16.6-13.4-30-30-30zM716.7 554.5c0-16.6-13.4-30-30-30H551v30c0 58.5 38.1 123.7 92.8 123.7 22.9 0 45-11.9 62.2-33.6 10.3-13 8.1-31.9-4.9-42.1-13-10.3-31.9-8.1-42.1 4.9-5.3 6.7-11.1 10.9-15.1 10.9-4.3 0-11.9-5.1-19.1-16.4-3.3-5.3-6.2-11.2-8.4-17.4h70.4c16.4 0 29.9-13.4 29.9-30zM401.6 704c-25.4 0-46.1-24.2-46.1-53.9 0-16.6-13.4-30-30-30s-30 13.4-30 30c0 62.8 47.6 113.9 106.1 113.9 16.6 0 30-13.4 30-30s-13.5-30-30-30z" fill="#33CC99" /></svg>
            </div>
            <div className='text-center'>
              <h2 className='text-3xl font-bold'>Create new Account!</h2>
              <p className='text-sm'>Please enter your details</p>
            </div>
          </div>
          <form onSubmit={handleSignup} className='flex flex-col gap-4'>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} onSelect={() => setEvent("emailInput")} type="text" id="username" placeholdeer="Username" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onSelect={() => setEvent("emailInput")} type="email" id="email" placeholdeer="Email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className='relative'>
                <Input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} onSelect={() => setEvent("passwordInput")} type={showPswrd ? "text" : "password"} id="password" placeholdeer="Password" />
                <div onClick={() => { setShowPswrd(!showPswrd) }} className='absolute p-2.5 cursor-pointer top-0 right-0'>
                  {showPswrd ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
            </div>
            <p className='text-red-500 text-center'>{error}</p>
            <Button type="submit" className="rounded-2xl">Sign Up</Button>
          </form>
          <Button variant={"outline"} className="rounded-2xl">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            </div>
            Sign Up with Google
          </Button>
        </div>
        <div>Already have an account? <Link href={"/login"} className='font-semibold'>Log in</Link></div>
      </div>
    </div>
  )
}

export default Login