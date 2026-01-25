import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'

export const GitHub = ({ setSection }) => {
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setLoading(false), [])

    const fetchGithub = async () => {
        if (!username) { setError("All fields are required"); return }
        setLoading(true)
        const req = await fetch("/api/authorized/githubFetch", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ username })
        })
        const { success, data, error } = await req.json()
        if (success) {
            setSection("Primary")
        }

        setError(error || "Something went wrong")
        setLoading(false)
    }

    return <>
        <h3 className='font-semibold text-xl text-center'>GitHub</h3>
        <div className='gap-4 py-4'>
            <Label htmlFor="username">Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} id="username" className={"w-full"} />
        </div>
        <Button disabled={loading} onClick={fetchGithub}>Submit</Button>
    </>
}