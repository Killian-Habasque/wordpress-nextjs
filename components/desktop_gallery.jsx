"use client";
import { productThumbnails } from "../lib/utils";
import Image from "next/image";
import { productImages } from "../lib/utils";
import Lightbox from "./lightbox";
import { useState } from "react";

const DesktopGallery = ({ className }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleIsLightboxOpen = () => {
    setIsLightboxOpen(!isLightboxOpen);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const isSelected = (index) => {
    return index === selectedImage;
  };

  return (
    <div className={className}>
      {isLightboxOpen && (
        <Lightbox
          className="fixed inset-0 z-[9999] grid h-full w-full place-content-center gap-10 bg-slate-950/75"
          handleIsLightboxOpen={handleIsLightboxOpen}
        />
      )}
      <div className="cursor-pointer overflow-hidden rounded-3xl">
        <Image
          onClick={handleIsLightboxOpen}
          src={productImages[selectedImage].url}
          width={550}
          height={550}
          alt={`Product Image`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full justify-between gap-1">
        {productThumbnails.map((thumbnail, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`aspect-square shrink cursor-pointer overflow-hidden rounded-xl transition-all duration-150 ease-in-out ${
              isSelected(index) ? "outline outline-2 outline-orange-500/100" : ""
            }`}
          >
            <Image
              key={index}
              src={thumbnail.url}
              width={88}
              height={88}
              alt={`Product Thumbnail ${index + 1}`}
              className={`h-full w-full object-cover transition-all duration-150 ease-in-out hover:opacity-45 ${isSelected(index) ? "opacity-45" : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopGallery;