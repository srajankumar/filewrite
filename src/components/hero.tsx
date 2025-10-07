import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <Button asChild>
            <Link href={`/textbox`}>Open Text Box</Link>
          </Button>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Button disabled variant={"outline"}>
                  Open Canvas
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                Coming soon!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default Hero;
