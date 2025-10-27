import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <SignOutButton>
        <Button variant={"destructive"}>Sign Out</Button>
      </SignOutButton>
    </div>
  );
}
