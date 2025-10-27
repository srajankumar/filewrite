import React from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginOptions from "@/components/landing-page/login-options";
import Link from "next/link";

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
          <Dialog>
            <DialogTrigger asChild>
              <Button>Try for free</Button>
            </DialogTrigger>
            <DialogContent>
              <LoginOptions />
            </DialogContent>
          </Dialog>
          <SignedOut>
            <SignInButton>
              <Button variant={"secondary"}>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button asChild variant={"secondary"}>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
          </SignedIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
