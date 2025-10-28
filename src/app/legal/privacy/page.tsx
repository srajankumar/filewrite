// import React from "react";
// import Head from "next/head"; // For SEO
// import { Mail, Clock } from "lucide-react";

// // Define a simple layout or wrapper component for better readability and styling
// const LegalPageWrapper: React.FC<{
//   title: string;
//   children: React.ReactNode;
// }> = ({ title, children }) => (
//   <div className="container mx-auto px-4 py-12 max-w-4xl">
//     <Head>
//       <title>{title} | [Your App Name]</title>
//     </Head>
//     <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
//       {title}
//     </h1>
//     <div className="prose prose-lg dark:prose-invert">{children}</div>
//   </div>
// );

// const PrivacyPolicy: React.FC = () => {
//   const APP_NAME = "[Your App Name]";
//   const CONTACT_EMAIL = "[Your Contact Email]";

//   return (
//     <LegalPageWrapper title="Privacy Policy">
//       <p className="flex items-center gap-2 mb-8 text-lg font-medium text-gray-600 dark:text-gray-400">
//         <Clock className="w-5 h-5" />
//         Last Updated: October 28, 2025
//       </p>

//       <h2 id="introduction">1. Introduction</h2>
//       <p>
//         This Privacy Policy describes how {APP_NAME} ("we," "us," or "our")
//         collects, uses, and discloses information when you use our file sharing,
//         URL shortening, and collaborative text services (the "Service"). By
//         using the Service, you agree to the collection and use of information in
//         accordance with this policy.
//       </p>

//       <h2 id="information-collected">2. Information We Collect</h2>
//       <p>
//         We collect the following types of information necessary to provide the
//         Service:
//       </p>

//       <h3 className="text-xl font-bold mt-6 mb-2">2.1. Account Data</h3>
//       <ul>
//         <li>
//           <strong>Clerk User ID:</strong> Your unique ID and associated account
//           data (e.g., email address) managed by **Clerk**, which we use to link
//           your files and short codes to your account.
//         </li>
//       </ul>

//       <h3 className="text-xl font-bold mt-6 mb-2">2.2. Service Data</h3>
//       <ul>
//         <li>
//           <strong>File/URL Metadata:</strong> Data such as file size, upload
//           timestamp, and the generated **short code**.
//         </li>
//         <li>
//           <strong>Storage Provider:</strong> All file data and related metadata
//           are stored and processed on **Supabase Storage**.
//         </li>
//         <li>
//           <strong>Collaborative Text Content:</strong> The text you enter into
//           the public collaborative text box. **This content is PUBLIC and
//           viewable by all users. Do not enter sensitive information.**
//         </li>
//       </ul>

//       <h3 className="text-xl font-bold mt-6 mb-2">2.3. Usage Data</h3>
//       <ul>
//         <li>
//           <strong>Log Data:</strong> IP address, browser type, and timestamps
//           related to file uploads, downloads, URL clicks, and text box edits. We
//           use this for security, debugging, and abuse detection.
//         </li>
//       </ul>

//       <h2 id="data-use">3. How We Use Your Information</h2>
//       <p>
//         We use the collected information for the following primary purposes:
//       </p>
//       <ul>
//         <li>
//           To **Provide and Maintain** the core functionality (file hosting, URL
//           redirection).
//         </li>
//         <li>
//           To **Enable Collaboration** by displaying public text box content in
//           real-time.
//         </li>
//         <li>
//           To **Ensure Security** and protect the Service from fraudulent or
//           malicious use.
//         </li>
//         <li>To **Debug and Improve** the Service performance.</li>
//       </ul>

//       <h2 id="disclosure">4. Sharing and Disclosure of Information</h2>
//       <p>
//         We **do not sell** your personal information. We share data only as
//         necessary:
//       </p>
//       <ul>
//         <li>
//           <strong>Public Content:</strong> Content you intentionally share
//           (files, shortened URLs, **collaborative text**) is visible to other
//           users and the public as defined by the Service's design.
//         </li>
//         <li>
//           <strong>Service Providers:</strong> We rely on trusted third parties:
//           **Supabase** (for database and storage) and **Clerk** (for
//           authentication). Your data resides on their infrastructure as needed
//           for the Service to function.
//         </li>
//         <li>
//           <strong>Legal Compliance:</strong> If required by law, subpoena, or to
//           protect the safety and rights of our users or the public.
//         </li>
//       </ul>

//       <h2 id="your-rights">5. Your Data Rights</h2>
//       <p>You have control over your data:</p>
//       <ul>
//         <li>
//           <strong>Access and Correction:</strong> You can view and edit your
//           account details via the Clerk management interface.
//         </li>
//         <li>
//           <strong>Deletion:</strong> You can delete your uploaded files and
//           short codes directly through your account dashboard, which removes the
//           records from our Supabase database.
//         </li>
//       </ul>

//       <h2 id="contact">6. Contact Information</h2>
//       <p>
//         If you have any questions about this Privacy Policy, please contact us:
//       </p>
//       <p className="flex items-center gap-2 font-semibold">
//         <Mail className="w-5 h-5" />
//         Email:{" "}
//         <a
//           href={`mailto:${CONTACT_EMAIL}`}
//           className="text-blue-500 hover:underline"
//         >
//           {CONTACT_EMAIL}
//         </a>
//       </p>
//     </LegalPageWrapper>
//   );
// };

// export default PrivacyPolicy;

import React from "react";

export default function page() {
  return <div>page</div>;
}
