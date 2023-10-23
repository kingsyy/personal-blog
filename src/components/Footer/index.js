"use client";
import React from "react";
import { DribbbleIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "../Icons";
import siteMetadata from "@/src/utils/siteMetaData";

const Footer = () => {
  return (
    <footer className="relative mt-auto rounded-2xl bg-dark dark:bg-accentDark/90 flex items-center text-light dark:text-dark w-full  font-medium py-6 px-8 flex-col md:flex-row justify-between">
        <span className="text-center">
          &copy;2023 Arthur. All rights reserved.
        </span>
        <div className="flex items-center">
        <a
          href={siteMetadata.linkedin}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Reach out to me via LinkedIn"
          target="_blank"
        >
          <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.twitter}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Reach out to me via Twitter"
          target="_blank"
        >
          <TwitterIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.github}
          className="inline-block w-6 h-6 mr-4 fill-light"
          aria-label="Check my profile on Github"
          target="_blank"
        >
          <GithubIcon className="fill-light dark:fill-dark  hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.dribbble}
          className="inline-block w-6 h-6 mr-4"
          aria-label="Check my profile on Dribbble"
          target="_blank"
        >
          <DribbbleIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
      </div>
        <div className="text-center">
          Made with &hearts; by{" "}
          <a href="https://devdreaming.com" className="underline" target="_blank">
            Arthur
          </a>
        </div>
    </footer>
  );
};

export default Footer;
