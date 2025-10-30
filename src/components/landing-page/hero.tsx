import React from "react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
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
        <div className="flex gap-3 flex-wrap">
          <SignInButton>
            <Button>Try for free</Button>
          </SignInButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
