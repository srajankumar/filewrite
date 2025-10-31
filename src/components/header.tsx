"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Code,
  FolderOpen,
  LogOut,
  Paperclip,
  SquareMousePointer,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between py-10">
      <Link href={"/"} className="flex items-center gap-3">
        <Image
          src={"/assets/logo-transparant.png"}
          alt="Filewrite"
          width={25}
          height={25}
        />
      </Link>
      <TooltipProvider delayDuration={0}>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="md:text-sm text-xs tracking-wide"
                variant={pathname == "/file-sharing" ? "secondary" : "ghost"}
                size={"icon"}
                asChild
              >
                <Link href={"/file-sharing"}>
                  <FolderOpen />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              File Sharing
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="md:text-sm text-xs tracking-wide"
                variant={pathname == "/url-shortener" ? "secondary" : "ghost"}
                size={"icon"}
                asChild
              >
                <Link href={"/url-shortener"}>
                  <Paperclip />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              URL Shortener
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="md:text-sm text-xs tracking-wide"
                variant={
                  pathname == "/collaborative-textbox" ? "secondary" : "ghost"
                }
                size={"icon"}
                asChild
              >
                <Link href={"/collaborative-textbox"}>
                  <SquareMousePointer />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Collaborative Textbox
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="md:text-sm text-xs tracking-wide"
                variant={pathname == "/mdx-editor" ? "secondary" : "ghost"}
                size={"icon"}
                asChild
              >
                <Link href={"/mdx-editor"}>
                  <Code />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              MDX Editor
            </TooltipContent>
          </Tooltip>
          <ModeToggle />
          <SignOutButton>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="cursor-pointer text-destructive hover:text-destructive"
            >
              <LogOut />
            </Button>
          </SignOutButton>
        </div>
      </TooltipProvider>
    </header>
  );
}
