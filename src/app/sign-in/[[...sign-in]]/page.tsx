"use client";

import * as React from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function SignInForm() {
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  if (isSignedIn) {
    router.push("/file-sharing");
  }

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              return;
            }

            router.push("/dashboard");
          },
        });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      setLoading(false);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display a form to capture the user's email and password
  return (
    <>
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-5 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <form onSubmit={(e) => handleSubmit(e)}>
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
                  <h1 className="text-xl font-bold">Sign In</h1>
                  <FieldDescription>
                    Don&apos;t have an account?{" "}
                    <Button
                      asChild
                      type="button"
                      size={"link"}
                      variant={"link"}
                    >
                      <Link href="/sign-up">Sign up</Link>
                    </Button>
                  </FieldDescription>
                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    value={password}
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
                <Field>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <>
                        Loading
                        <Spinner />
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
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
