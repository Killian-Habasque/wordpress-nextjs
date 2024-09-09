"use client";
import { productThumbnails } from "../lib/utils";
import Image from "next/image";
import { productImages } from "../lib/utils";
import Lightbox from "./lightbox";
import { useState } from "react";

const DesktopGallery = ({ className, gallery}) => {
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
          gallery={gallery}
        />
      )}
      <div className="relative overflow-hidden rounded-3xl" style={{ height: '70vh' }}>
        <img
          onClick={handleIsLightboxOpen}
          src={gallery[selectedImage].sourceUrl}
          alt={`Product Image`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full justify-between gap-1 mt-4">
        {gallery.map((thumbnail, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`aspect-square shrink cursor-pointer overflow-hidden rounded-xl transition-all duration-150 ease-in-out ${
              isSelected(index) ? "outline outline-2 outline-orange-500/100" : ""
            }`}
          >
            <img
              src={thumbnail.sourceUrl}
              alt={thumbnail.altText}
              className={`h-full w-full object-cover transition-all duration-150 ease-in-out hover:opacity-45 ${isSelected(index) ? "opacity-45" : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopGallery;
