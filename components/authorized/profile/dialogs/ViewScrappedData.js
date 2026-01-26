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
            This action cannot be undone. This page is not ready.
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ViewScrappedData