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
          <Button asChild>
            <Link href={`/textbox`}>Open Text Box</Link>
          </Button>
          {/* <Button asChild disabled variant={"outline"}>
            <Link href={`/canvas`}>Open Canvas</Link>
          </Button> */}
          <Button disabled variant={"outline"}>
            Open Canvas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
