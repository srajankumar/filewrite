import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <Link href={"/"} className="flex items-center gap-3">
        <Image
          src={"/assets/logo-transparant.png"}
          alt="Filewrite"
          width={30}
          height={30}
        />
        <h1 className="text-xl font-semibold">Filewrite</h1>
      </Link>
      <Link href={"https://github.com/srajankumar"} target="_blank">
        <Button className="cursor-pointer" variant={"outline"} size={"icon"}>
          <Github />
        </Button>
      </Link>
    </header>
  );
};

export default Header;
