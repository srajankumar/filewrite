import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoginOptions from "@/components/landing-page/login-options";

const Hero = () => {
  return (
    <section className="grid gap-8 items-start py-10">
      <div className="flex flex-col justify-center">
        <h2 className="md:text-3xl text-2xl font-semibold mb-3">
          Collaborate Instantly Online
        </h2>
        <p className="text-muted-foreground mb-6 max-w-prose">
          Share files, shorten links, and co-create ideas - all in ones place.
        </p>
        <div className="flex gap-3">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button>Try for free</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-5xl">
              <LoginOptions />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button disabled variant={'outline'} asChild>
            <Link href={`/login`}>Login</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
