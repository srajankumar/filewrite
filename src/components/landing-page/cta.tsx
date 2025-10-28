import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

const CTA = () => {
  return (
    <section className="py-10 my-10 bg-primary text-white text-center rounded-lg">
      <h2 className="md:text-2xl text-xl font-semibold text-center mb-2">
        Ready to simplify your sharing?
      </h2>
      <p className="text-indigo-100 mb-8 text-sm">Get started for free.</p>
      <SignedOut>
        <SignInButton>
          <Button variant={"cta"}>Try for free</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Button variant={"cta"} asChild>
          <Link href={"/dashboard/file-sharing"}>Dashboard</Link>
        </Button>
      </SignedIn>
    </section>
  );
};

export default CTA;
