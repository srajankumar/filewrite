"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Code,
  FolderOpen,
  LogOut,
  Paperclip,
  SquareMousePointer,
} from "lucide-react";

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
      <div className="flex items-center gap-2">
        <SignedIn>
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
        </SignedIn>
        <SignedIn>
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
        </SignedIn>
        <Button
          className="md:text-sm text-xs tracking-wide"
          variant={pathname == "/collaborative-textbox" ? "secondary" : "ghost"}
          size={"icon"}
          asChild
        >
          <a href={"/collaborative-textbox"}>
            <SquareMousePointer />
          </a>
        </Button>
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
        <ModeToggle />
        <SignedIn>
          <SignOutButton>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="cursor-pointer text-destructive hover:text-destructive"
            >
              <LogOut />
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </header>
  );
}
