"use client";
import { productThumbnails } from "../lib/utils";
import Image from "next/image";
import { productImages } from "../lib/utils";
import { SvgClose } from "./ui/icons";
import { useState } from "react";
import { ButtonNext, ButtonPrevious } from "./ui/buttons";

const Lightbox = ({ className, handleIsLightboxOpen, gallery }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = selectedImage === 0;
    const newIndex = isFirstSlide ? gallery.length - 1 : selectedImage - 1;
    setSelectedImage(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = selectedImage === gallery.length - 1;
    const newIndex = isLastSlide ? 0 : selectedImage + 1;
    setSelectedImage(newIndex);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const isSelected = (index) => {
    return index === selectedImage;
  };

  return (
    <section className={className}>

      <div className="absolute flex aspect-square w-full h-full cursor-pointer place-content-center py-8 px-8">
        <Image
          src={gallery[selectedImage].sourceUrl}
          width={1050}
          height={1050}
          alt={`Product Image ${selectedImage + 1}`}
          className="h-full w-full object-contain py-24 pt-0"
        />
        <ButtonPrevious
          className="absolute -left-0 z-10 flex size-10 cursor-pointer items-center justify-center place-self-center rounded-full bg-white"
          onClick={prevSlide}
        />
        <ButtonNext
          className="absolute -right-0 z-10 flex size-10 cursor-pointer items-center justify-center place-self-center rounded-full bg-white"
          onClick={nextSlide}
        />
        <button
          className="absolute -right-0 z-10 flex size-10 cursor-pointer items-center justify-start place-self-start rounded-full bg-white"
          role="button"
          type="button"
          aria-label="Close Lightbox"
          onClick={handleIsLightboxOpen}
        >
          <SvgClose className="fill-white transition-colors duration-100 ease-in-out hover:fill-orange-500" />
        </button>

        <div className="absolute flex place-self-end max-w-[30.375rem] self-end justify-between gap-1 px-[3.375rem]">
          {gallery.map((thumbnail, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`aspect-square shrink cursor-pointer overflow-hidden rounded-xl transition-all duration-150 ease-in-out ${isSelected(index) ? "outline outline-2 outline-orange-500/100" : ""
                }`}
            >
              <Image
                key={index}
                src={thumbnail.sourceUrl}
                width={88}
                height={88}
                alt={thumbnail.altText}
                className={`h-full w-full object-cover transition-all duration-150 ease-in-out hover:opacity-45 ${isSelected(index) ? "opacity-45" : ""
                  }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lightbox;
