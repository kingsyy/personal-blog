import ExportedImage from "next-image-export-optimizer";
import Link from "next/link"
import profileImg from "@/public/logo.png"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-dark dark:text-light hidden sm:flex">
        <div className=" w-12 md:w-16 rounded-full overflow-hidden border border-solid border-dark dark:border-gray  mr-2 md:mr-4">
            <ExportedImage src={profileImg} alt="Arthur's avatar" className="w-full h-auto rounded-full" sizes="20vw" priority />
        </div>
        <span className="font-bold dark:font-semibold text-lg md:text-xl">Arthur's Blog</span>
    </Link>
  )
}

export default Logo