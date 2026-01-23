import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

const ViewScrappedData = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Scapped Data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">View Scapped Data</DialogTitle>
          <div>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ViewScrappedData