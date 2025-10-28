"use client";

import * as React from "react";
import { useSignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Page() {
  const { isSignedIn } = useAuth();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  if (isSignedIn) {
    router.push("/dashboard/file-sharing");
  }

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

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
      setLoading(false);
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setLoading(false);
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

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
      setLoading(false);
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setVerifying(false);
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-5 md:p-10">
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-6">
              <form onSubmit={handleVerify}>
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
                    <h1 className="text-xl font-bold">
                      Enter verification code
                    </h1>
                    <FieldDescription>
                      We sent a 6-digit code to your email address
                    </FieldDescription>
                  </div>
                  <Field className="mx-auto">
                    <FieldLabel htmlFor="otp" className="sr-only">
                      Verification code
                    </FieldLabel>
                    <InputOTP
                      disabled={loading}
                      value={code}
                      id="code"
                      name="code"
                      onChange={(value) => setCode(value)}
                      maxLength={6}
                      required
                      containerClassName="gap-4"
                    >
                      <InputOTPGroup className="gap-2.5 mx-auto *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <FieldDescription className="text-center">
                      Didn&apos;t receive the code?{" "}
                      <Button
                        type="button"
                        size={"link"}
                        onClick={handleRetry}
                        variant={"link"}
                      >
                        Retry
                      </Button>
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button disabled={loading} type="submit">
                      {loading ? (
                        <>
                          Loading
                          <Spinner />
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <>
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-5 md:p-10">
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
                  <h1 className="text-xl font-bold">Sign Up</h1>
                  <FieldDescription>
                    Already have an account?{" "}
                    <Button
                      asChild
                      type="button"
                      size={"link"}
                      variant={"link"}
                    >
                      <Link href="/sign-in">Sign in</Link>
                    </Button>
                  </FieldDescription>
                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={emailAddress}
                    disabled={loading}
                    onChange={(e) => setEmailAddress(e.target.value)}
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
                      "Create Account"
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
