"use client"
import ExportedImage from "next-image-export-optimizer";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "../Icons";
import { ImageCarrouselParam } from "@/models/params";

export default function ImageCarrousel({ images }: ImageCarrouselParam) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    const newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    const newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const handleImageClick = (e) => {
    const { clientX, currentTarget } = e;
    const clickPosition = clientX - currentTarget.getBoundingClientRect().left;
    const imageWidth = currentTarget.offsetWidth;

    if (clickPosition < imageWidth / 2) {
      handlePrevSlide();
    } else {
      handleNextSlide();
    }
  };

  const biggestImageIndex = images.reduce((maxIndex, image, currentIndex) => {
    return image.source.height > images[maxIndex].source.height ? currentIndex : maxIndex;
  }, 0);

  return (
    <div className="relative">
      <button
        onClick={handlePrevSlide}
        className="absolute left-2.5 inset-y-1/2 z-20 w-10 h-10 ml-2 flex items-center justify-center rounded-full bg-neutral-500/75 transition-transform hover:scale-125 lg:w-14 lg:h-14 lg:hover:scale-150"
      >
        <ChevronLeft className="stroke-dark dark:stroke-light" />
      </button>
      {images.map((image, index) => {
        if (index === currentSlide) {
          return (
            <ExportedImage
              key={index}
              alt={image.alt}
              src={image.source}
              className="absolute translate-1/2 top-1/2 left-1/2 ease-in-out cursor-pointer z-10"
              style={{ transform: "translate(-50%, -50%)" }}
              onClick={handleImageClick}
            />
          );
        }
      })}
      <ExportedImage src={images[biggestImageIndex].source} alt={images[biggestImageIndex].alt} className="opacity-0" />

      <button
        onClick={handleNextSlide}
        className="absolute right-2.5 inset-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-500/75 transition-transform hover:scale-125 lg:w-14 lg:h-14 lg:hover:scale-150"
      >
        <ChevronRight className="stroke-dark dark:stroke-light" />
      </button>

      <div className="absolute flex justify-center items-center w-full p-2 bottom-0">
        {images.map((_, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? "h-4 w-4 bg-neutral-400 dark:bg-white-700 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-4 w-4 bg-neutral-500/75 dark:bg-white-300/75 rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}