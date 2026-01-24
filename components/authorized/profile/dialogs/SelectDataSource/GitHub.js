import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export const GitHub = () => {
    const [username, setUsername] = useState("")

    const fetchGithub = async () => {
        const req = await fetch("/api/authorized/githubFetch", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ username })
        })
        const res = await req.json()
        console.log(res)
    }

    return <>
        <h3 className='font-semibold text-xl text-center'>GitHub</h3>
        <div className='gap-4 py-4'>
            <Label htmlFor="username">Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} id="username" className={"w-full"} />
        </div>
        <Button onClick={fetchGithub}>Submit</Button>
    </>
}