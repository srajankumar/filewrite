"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { GalleryVerticalEnd } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return <div>Loading...</div>;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return <div>Loading...</div>;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for session tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              router.push("/sign-up/tasks");
              return;
            }

            router.push("/");
          },
        });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error("Sign-up attempt not complete:", signUpAttempt);
        console.error("Sign-up attempt status:", signUpAttempt.status);
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <h1>Verify your email</h1>
        <form onSubmit={handleVerify}>
          <label id="code">Enter your verification code</label>
          <input
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      </>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <>
      <div className="bg-background flex min-h-dvh flex-col items-center justify-center gap-6 p-5 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Link
                    href="/"
                    className="flex flex-col items-center gap-2 font-medium"
                  >
                    <Image
                      src={"/assets/logo-transparant.png"}
                      alt="Filewrite"
                      width={30}
                      height={30}
                    />
                    <span className="sr-only">Filewrite</span>
                  </Link>
                  <h1 className="text-xl font-bold">Welcome to Filewrite</h1>
                  <FieldDescription>
                    Already have an account?{" "}
                    <Link href="/sign-in">Sign in</Link>
                  </FieldDescription>
                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="*********"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field>
                  <Button type="submit">Create Account</Button>
                </Field>
                <div id="clerk-captcha" />
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
