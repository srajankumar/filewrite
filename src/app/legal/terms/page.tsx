import React from "react";
import { Clock } from "lucide-react";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/landing-page/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function Terms() {
  return (
    <main className="min-h-dvh max-w-xl mx-auto px-5">
      <Header />
      <div className="grid gap-5 pb-20">
        <div className="py-5 grid gap-2">
          <h1 className="font-semibold text-2xl">Terms & Conditions</h1>
          <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            <p>Last Updated: October 28, 2025</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold">1. Agreement to Terms</h2>
        <p className="text-muted-foreground">
          By accessing or using the Service, you confirm your agreement to be
          bound by these Terms & Conditions (&quot;Terms&quot;). If you disagree
          with any part of the terms, then you do not have permission to access
          the Service.
        </p>

        <h2 className="text-lg font-semibold">
          2. User-Generated Content and Conduct
        </h2>

        <h3 className="font-semibold">2.1. Responsibility for Content</h3>

        <p className="text-muted-foreground">
          You are solely responsible for all files, data, shortened URLs, and
          text entered into the collaborative text box (&quot;Content&quot;)
          that you generate on the Service. You affirm that you own or have the
          necessary rights to use and authorize us to host all your Content.
        </p>

        <h3 className="font-semibold">2.2. Collaborative Text Box</h3>

        <p className="font-semibold text-destructive">
          {/* <Shield className="w-5 h-5" /> */}
          WARNING: Content entered into the collaborative text box is PUBLIC and
          viewed by all users in real-time. Do not post private, sensitive, or
          personally identifiable information here.
        </p>

        <h3 className="font-semibold">2.3. Prohibited Content and Use</h3>

        <p className="text-muted-foreground">
          You agree not to upload, share, or link to content that:
        </p>

        <ol className="text-muted-foreground list-disc ml-10 grid gap-2">
          <li>
            Is illegal, promotes illegal activities, or violates any local,
            state, national, or international law.
          </li>
          <li>Is harmful, defamatory, or harassing (including hate speech).</li>
          <li>
            Infringes upon any third party&apos;s intellectual property rights
            (e.g., copyright or trademark infringement).
          </li>
          <li>
            Contains software viruses, malware, or any other computer code
            designed to interrupt, destroy, or limit the functionality of any
            computer software or hardware.
          </li>
        </ol>

        <h2 className="text-lg font-semibold">
          3. Hosting and Storage (Supabase)
        </h2>
        <p className="text-muted-foreground">
          We use <span className="text-primary font-semibold">Supabase</span>{" "}
          for our database and file storage services. By using the Service, you
          acknowledge and agree that your Content and associated metadata will
          be stored and processed on{" "}
          <span className="text-primary font-semibold">
            Supabase&apos;s infrastructure
          </span>
          . While we take reasonable steps to ensure data integrity, we are
          subject to the uptime and limitations of our third-party provider.
        </p>

        <h2 className="text-lg font-semibold">4. Termination</h2>
        <p className="text-muted-foreground">
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms, particularly Section 2.3
          (Prohibited Content).
        </p>

        <h2 className="text-lg font-semibold">5. Limitation of Liability</h2>
        <p className="text-muted-foreground">
          The Service is provided on an &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; basis. We do not warrant that the Service will be
          uninterrupted, error-free, or secure.{" "}
          <span className="text-primary font-semibold">Filewrite</span> shall
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages, including loss of profits, data, or other intangible
          losses, resulting from:
        </p>
        <ol className="text-muted-foreground list-disc ml-10 grid gap-2">
          <li>
            Your access to or use of, or inability to access or use, the
            Service.
          </li>
          <li>
            Any conduct or content of any third party on the Service (e.g.,
            content posted in the public text box).
          </li>
          <li>
            Loss or corruption of files stored on the Service, including those
            stored on{" "}
            <span className="text-primary font-semibold">Supabase Storage</span>
            .
          </li>
        </ol>

        <h2 className="text-lg font-semibold">6. Changes to Terms</h2>
        <p className="text-muted-foreground">
          We reserve the right to modify or replace these Terms at any time. We
          will provide reasonable notice before any new terms take effect. By
          continuing to access or use our Service after those revisions become
          effective, you agree to be bound by the revised terms.
        </p>
      </div>
      <Footer />
    </main>
  );
}
