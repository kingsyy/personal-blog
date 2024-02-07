"use client"
import Link from "next/link";
import Logo from "./Logo";
import { GithubIcon, LinkedinIcon, MoonIcon, SunIcon } from "../Icons";
import { useThemeSwitch } from "../Hooks/useThemeSwitch";
import { cx } from "../../utils";
import siteMetadata from "../../utils/siteMetaData";
import { Dispatch, SetStateAction } from "react";

const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  return (
    <header className="w-full p-4  px-5 sm:px-10 flex items-center justify-between">
      <Logo />
      <nav className=" w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center flex
        fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50">
        <Link href="/" className="mr-2">Home</Link>
        <Link href="/categories/all" className="mx-2">Blogs</Link>
        <Link href="/about" className="mx-2">About</Link>
        <Link href="/contact" className="mx-2">Contact</Link>
        <button onClick={() => (setMode as Dispatch<SetStateAction<string>>)(mode === "light" ? "dark" : "light")}
          className={cx("w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1", mode === "light" ? "bg-dark text-light" :
            "bg-light text-dark")}
          aria-label="theme-switcher"
        >
          {
            mode === "light" ? <MoonIcon className={"fill-dark"} /> : <SunIcon className={"fill-dark"} />
          }
        </button>
      </nav>
      <div className="hidden sm:flex items-center">
        <a href={siteMetadata.linkedin} className="inline-block w-6 h-6 mr-4" aria-label="Reach out to me via LinkedIn" target="_blank"><LinkedinIcon className="hover:scale-125 transition-all ease duration-200" /></a>
        <a href={siteMetadata.github} className="inline-block w-6 h-6 mr-4" aria-label="Check my profile on Github" target="_blank"><GithubIcon className="hover:scale-125 transition-all ease duration-200 dark:fill-light" /></a>
      </div>
    </header>
  )
}

export default Header;