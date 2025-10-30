import React from "react";
import { Clock } from "lucide-react";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/landing-page/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function Terms() {
  return (
    <main className="min-h-dvh max-w-xl mx-auto px-5">
      <Header />
      <div className="grid gap-5 pb-10">
        <div className="py-5 grid gap-2">
          <h1 className="font-semibold text-2xl">Privacy Policy</h1>
          <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            <p>Last Updated: October 28, 2025</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold">1. Introduction</h2>
        <p className="text-muted-foreground">
          This Privacy Policy describes how Filewrite (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses
          information when you use our file sharing, URL shortening, and
          collaborative text services (the &quot;Service&quot;). By using the
          Service, you agree to the collection and use of information in
          accordance with this policy.
        </p>

        <h2 className="text-lg font-semibold">2. Information We Collect</h2>
        <p className="text-muted-foreground">
          We collect the following types of information necessary to provide the
          Service:
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2">2.1. Account Data</h3>
        <ul className="text-muted-foreground list-disc ml-10 grid gap-2">
          <li>
            <span className="text-foreground font-semibold">
              Clerk User ID:
            </span>{" "}
            Your unique ID and associated account data (e.g., email address)
            managed by <span className="text-primary font-semibold">Clerk</span>
            , which we use to link your files and short codes to your account.
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-2">2.2. Service Data</h3>
        <ul className="text-muted-foreground list-disc ml-10 grid gap-2">
          <li>
            <span className="text-foreground font-semibold">
              File / URL Metadata:
            </span>{" "}
            Data such as file size, upload timestamp, and the generated{" "}
            <span className="text-primary font-semibold">short code</span>.
          </li>
          <li>
            <span className="text-foreground font-semibold">
              Storage Provider:
            </span>{" "}
            All file data and related metadata are stored and processed on
            <span className="text-primary font-semibold">Supabase Storage</span>
            .
          </li>
          <li>
            <span className="text-foreground font-semibold">
              Collaborative Text Content:
            </span>{" "}
            The text you enter into the public collaborative text box.{" "}
            <span className="text-primary font-semibold">
              This content is PUBLIC and viewable by all users. Do not enter
              sensitive information
            </span>
            .
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-2">2.3. Usage Data</h3>
        <ul className="text-muted-foreground list-disc ml-10 grid gap-2">
          <li>
            <span className="text-foreground font-semibold">Log Data:</span> IP
            address, browser type, and timestamps related to file uploads,
            downloads, URL clicks, and text box edits. We use this for security,
            debugging, and abuse detection.
          </li>
        </ul>

        <h2 className="text-lg font-semibold">
          3. How We Use Your Information
        </h2>
        <p className="text-muted-foreground">
          We use the collected information for the following primary purposes:
        </p>
        <ul className="text-muted-foreground list-disc ml-10 grid gap-2">
          <li>
            To{" "}
            <span className="text-primary font-semibold">
              Provide and Maintain
            </span>{" "}
            the core functionality (file hosting, URL redirection).
          </li>
          <li>
            To{" "}
            <span className="text-primary font-semibold">
              Enable Collaboration
            </span>{" "}
            by displaying public text box content in real-time.
          </li>
          <li>
            To{" "}
            <span className="text-primary font-semibold">Ensure Security</span>{" "}
            and protect the Service from fraudulent or malicious use.
          </li>
          <li>
            To{" "}
            <span className="text-primary font-semibold">
              Debug and Improve
            </span>{" "}
            the Service performance.
          </li>
        </ul>

        <h2 className="text-lg font-semibold">
          4. Sharing and Disclosure of Information
        </h2>
        <p className="text-muted-foreground">
          We <span className="text-primary font-semibold">do not sell</span>{" "}
          your personal information. We share data only as necessary:
        </p>
        <ul className="text-muted-foreground list-disc ml-10 grid gap-2">
          <li>
            <span className="text-foreground font-semibold">
              Public Content:
            </span>{" "}
            Content you intentionally share (files, shortened URLs,
            <span className="text-primary font-semibold">
              collaborative text
            </span>
            ) is visible to other users and the public as defined by the
            Service&apos;s design.
          </li>
          <li>
            <span className="text-foreground font-semibold">
              Service Providers:
            </span>{" "}
            We rely on trusted third parties:{" "}
            <span className="text-primary font-semibold">Supabase</span> (for
            database and storage) and{" "}
            <span className="text-primary font-semibold">Clerk</span> (for
            authentication). Your data resides on their infrastructure as needed
            for the Service to function.
          </li>
          <li>
            <span className="text-foreground font-semibold">
              Legal Compliance:
            </span>{" "}
            If required by law, subpoena, or to protect the safety and rights of
            our users or the public.
          </li>
        </ul>

        <h2 className="text-lg font-semibold">5. Your Data Rights</h2>
        <p className="text-muted-foreground">
          You have control over your data:
        </p>
        <ul className="text-muted-foreground list-disc ml-10 grid gap-2">
          <li>
            <span className="text-foreground font-semibold">
              Access and Correction:
            </span>{" "}
            You can view and edit your account details via the Clerk management
            interface.
          </li>
          <li>
            <span className="text-foreground font-semibold">Deletion:</span> You
            can delete your uploaded files and short codes directly through your
            account dashboard, which removes the records from our Supabase
            database.
          </li>
        </ul>
      </div>
      <Footer />
    </main>
  );
}
