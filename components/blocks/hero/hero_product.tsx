import { useState } from 'react'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Radio,
    RadioGroup,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import {
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline'

import { StarIcon } from '@heroicons/react/20/solid'
import Categories from '../../elements/categories'
import Image from 'next/image'
import Breadcrumb from '../../elements/breadcrumb'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HeroProduct({ title, categories, productInfo }) {

    const breadcrumbs = [
        { id: 1, name: 'Accueil', href: '/' },
        { id: 2, name: 'Produits', href: '/produits' },
        { id: 3, name: title, href: "" }
    ];
    return (
        <section className="block hero_bg_image">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image gallery */}
                    <TabGroup className="flex flex-col-reverse">
                        {/* Image selector */}
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <TabList className="grid grid-cols-4 gap-6">
                                {productInfo.gallery?.nodes.map((image) => (
                                    <Tab
                                        key={image.id}
                                        className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                    >
                                        <span className="sr-only">{image.altText}</span>
                                        <span className="absolute inset-0 overflow-hidden rounded-md">

                                            <Image width={130} height={96} alt={image.altText} src={image.sourceUrl} className="h-full w-full object-cover object-center" />
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                                        />
                                    </Tab>
                                ))}
                            </TabList>
                        </div>

                        <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                            {productInfo.gallery?.nodes.map((image) => (
                                <TabPanel key={image.id}>
                                    <Image
                                        width={592}
                                        height={592}
                                        alt={image.altText}
                                        src={image.sourceUrl}
                                        className="h-full w-full object-cover object-center sm:rounded-lg"
                                    />
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <Breadcrumb breadcrumbs={breadcrumbs} />
                        <h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-6 mt-6 leading-none">{title}</h1>

                        {categories && (
                            <Categories categories={categories.edges} />
                        )}
                        {productInfo.price && (
                            <div className="mt-3 hidden">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">{productInfo.price} €</p>
                            </div>
                        )}
                        {/* Reviews */}
                        {productInfo.rating && (
                            <div className="mt-3">
                                <h3 className="sr-only">Avis</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                aria-hidden="true"
                                                className={classNames(
                                                    productInfo.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                                                    'h-5 w-5 flex-shrink-0',
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{productInfo.rating} out of 5 stars</p>
                                </div>
                            </div>
                        )}

                        {productInfo.description && (
                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>

                                <div
                                    dangerouslySetInnerHTML={{ __html: productInfo.description }}
                                    className="space-y-6 text-base text-gray-700"
                                />
                            </div>
                        )}
                        {productInfo.link && (
                            <div className="mt-10 flex">
                                <a
                                    href={productInfo.link}
                                    target='_blank'
                                    rel="nofollow"
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border gap-2 border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                >
                                    Consulter le produit
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        )}

                        {productInfo.details && (
                            <section aria-labelledby="details-heading" className="mt-12">
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>

                                <div className="divide-y divide-gray-200 border-t">
                                    {productInfo.details?.map((detail) => (
                                        <Disclosure key={detail.title} as="div">
                                            <h3>
                                                <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                                                    <span className="text-sm font-medium text-gray-900 group-data-[open]:text-indigo-600">
                                                        {detail.title}
                                                    </span>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon
                                                            aria-hidden="true"
                                                            className="block h-6 w-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                                                        />
                                                        <MinusIcon
                                                            aria-hidden="true"
                                                            className="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500 group-data-[open]:block"
                                                        />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="prose prose-sm pb-6">
                                                <ul role="list">
                                                    {detail.list.map((item) => (
                                                        <li key={item.listItem}>{item.listItem}</li>
                                                    ))}
                                                </ul>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}