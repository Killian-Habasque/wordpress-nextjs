import DesktopGallery from "./desktop_gallery";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 md:place-content-between md:gap-2">
      <DesktopGallery className="hidden md:grid md:max-h-[565px] md:max-w-[445px] md:gap-8" />

    </section>
  );
}