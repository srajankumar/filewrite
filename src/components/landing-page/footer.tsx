import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-10 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} - Filewrite by{" "}
      <Link
        href={"https://srajan.vercel.app"}
        target="_blank"
        className="hover:text-primary transition-colors duration-200"
      >
        Srajan Kumar
      </Link>
    </footer>
  );
};

export default Footer;
