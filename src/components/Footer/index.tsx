"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative mt-auto rounded-2xl bg-dark dark:bg-accentDark/90 flex items-center text-light dark:text-dark w-full  font-medium py-6 px-8 flex-col md:flex-row justify-between">
      <span className="text-center">
        &copy;{(new Date()).getFullYear()} Arthur. All rights reserved.
      </span>
      <Link href="/privacy">Privacy & Terms</Link>
      <div className="text-center">
        Made with &hearts; by{" "}
        <a href="/about" className="!underline underline-offset-2">
          Arthur
        </a>
      </div>
    </footer>
  );
};

export default Footer;
