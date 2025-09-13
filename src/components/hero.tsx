import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="grid gap-8 items-start py-10">
      <div className="flex flex-col justify-center">
        <h2 className="md:text-3xl text-2xl font-semibold mb-3">
          Collaborate Instantly Online
        </h2>
        <p className="text-muted-foreground mb-6 max-w-prose">
          Filewrite lets you generate shareable links with a collaborative text
          box and canvas. Invite anyone and start working together in real time.
        </p>

        <div className="flex gap-3">
          <Link href={`/textbox`}>
            <Button>Open Text Box</Button>
          </Link>
          <Link href={`/canvas`}>
            <Button disabled variant={"outline"}>
              Open Canvas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
