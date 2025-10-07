import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginOptions from "@/components/landing-page/login-options";

const CTA = () => {
  return (
    <section className="py-10 my-10 bg-primary text-white text-center rounded-lg">
        <h2 className="md:text-2xl text-xl font-semibold text-center mb-2">Ready to simplify your sharing?</h2>
        <p className="text-indigo-100 mb-8 text-sm">Get started for free - no signup required.</p>
        <Dialog>
            <DialogTrigger asChild>
              <Button variant={'secondary'}>Try for free</Button>
            </DialogTrigger>
            <DialogContent>
              <LoginOptions />
            </DialogContent>
        </Dialog>
    </section>
  )
}

export default CTA