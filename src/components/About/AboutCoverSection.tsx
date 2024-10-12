import React from 'react'
import ImageCarrousel from './ImageCarrousel';
import leavesImage from "public/about/leaves.jpg";
import mountainsImage from "public/about/mountains.jpg";
import mountains2Image from "public/about/mountains2.jpg";
import sunImage from "public/about/sun.jpg";
import swansImage from "public/about/swans.jpg";
import waterImage from "public/about/water.jpg";
import Link from 'next/link';

const AboutCoverSection = () => {
  return (
    <section className='w-ful border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light'>
      <div className='w-full md:w-1/2 h-full flex items-center border-r-2 border-solid border-dark dark:border-light'>
        <ImageCarrousel images={[
              { source: leavesImage, alt: "Leaves in sun" },
              { source: mountainsImage, alt: "Cold mountains" },
              { source: mountains2Image, alt: "Summer alps" },
              { source: sunImage, alt: "Sunset" },
              { source: swansImage, alt: "Swan family" },
              { source: waterImage, alt: "Cold water bridge" },
        ]}/>
      </div>
      <div className='w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16'>
        <h2 className='font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left'>
          Let's craft the digital future together.
        </h2>
        <p className='font-medium mt-4 text-base'>
          Welcome to my corner of the web, 
          where code dances and bytes paint stories of innovation.
          this blog was born out of the idea of giving back, after building on top of others for so long. 
        </p>
        <p className='font-medium mt-4 text-base'>
          I'm a full-stack developer with a software developer's associates degree. 
          When not immersed in code for work or personal projects, 
            you'll in nature often capturing the beauty through photography or
            doing sports like snowboarding and running.
          I also enjoy repairing electronics and working with IoT and self hosted solutions. 
          My digital heart is with privacy, security and inclusive design, with a love for anything open-source.
        </p>
        <p className='font-medium  mt-4 text-base'>
          The name Montali was chosen by my father, the one who sparked and facilitated my interest in the digital realm.
         {/*TODO add extra explanation*/}
          In memory of him I kept the domain and share my digital adventures here.
          For a deeper dive into my projects, 
              feel free to explore my <Link className="!underline underline-offset-2" href={"/categories/all"}>posts</Link>.
          You can find more about how this blog was created in my <Link className="!underline underline-offset-2" href={"/categories/blog"}>blog posts.</Link>
        </p>
      </div>
    </section>
  )
}

export default AboutCoverSection