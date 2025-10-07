import React from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoginOptions from "@/components/landing-page/login-options";

const CTA = () => {
  return (
    <section className="py-10 my-10 bg-primary text-white text-center rounded-lg">
        <h2 className="md:text-2xl text-xl font-semibold text-center mb-2">Ready to simplify your sharing?</h2>
        <p className="text-indigo-100 mb-8 text-sm">Get started for free - no signup required.</p>
       
        <AlertDialog>
            <AlertDialogTrigger>
               <Button variant={'secondary'}>Try for free</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-5xl">
              <LoginOptions />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </section>
  )
}

export default CTA