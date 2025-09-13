import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-10 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} - Filewrite by{" "}
      <Link
        href={"https://srajan.vercel.app"}
        target="_blank"
        className="underline underline-offset-4 hover:text-primary transition-colors duration-200"
      >
        Srajan Kumar
      </Link>
    </footer>
  );
};

export default Footer;
