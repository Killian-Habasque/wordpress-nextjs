import Avatar from "../avatar";
import Categories from "../categories";
import Date from "../date";
import DesktopGallery from "./gallery";

export default function ProductHero({ title, gallery, author, date, categories }) {

    return (
        <section className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">

            {gallery.length > 0 && (
                <DesktopGallery gallery={gallery} className="hidden md:grid md:gap-8" />
            )}
            <section className="w-full">
                <div className="max-w-2xl mx-auto">
                    <div className="block mb-6">
                        <Avatar author={author} />
                    </div>
                    <div className="mb-6 text-lg">
                        Posté le <Date dateString={date} />
                        <Categories categories={categories} />
                    </div>
                </div>
                <h2 className="text-[1.75rem] font-bold leading-snug md:text-[2.75rem] md:leading-[3rem]">
                    {title}
                </h2>

                <p className="text-[0.9375rem] text-clr-blue-600 md:text-base ">
                    Ceci est la description
                </p>
                <div className=" grid gap-4 md:gap-8">
                    <div className=" flex w-full items-center justify-between md:flex-col md:items-start md:gap-3">
                        <div className="flex items-center gap-6">
                            <span className="text-[1.75rem] font-bold">
                                <span className="sr-only">Discounted price</span>
                                40 €
                            </span>
                            <span className="rounded-lg bg-clr-orange-light px-2 py-1 text-base font-bold text-clr-orange-dark">
                                <span className="sr-only">Discounted %</span>
                                50
                            </span>
                        </div>
                        <span className="font-bold text-clr-blue-400 line-through">
                            <span className="sr-only">Original price</span>
                            50 €
                        </span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[37%,63%]">

                        {/* <ButtonAddToCart
                  className={
                    "flex h-[3.5rem] w-full cursor-pointer items-center justify-center  gap-6  rounded-xl bg-clr-orange-dark font-bold text-white drop-shadow-[0_25px_25px_rgba(255,125,26,0.25)] hover:opacity-75 md:drop-shadow-none"
                  }
                  onClick={() => {
                    console.log("add")
                  }}
                /> */}
                        <button
                            className={
                                "bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
                            }
                            onClick={() => {
                                console.log("add")
                            }}
                        >Add to cart</button>
                    </div>
                </div>
            </section>

        </section>
    );
}
