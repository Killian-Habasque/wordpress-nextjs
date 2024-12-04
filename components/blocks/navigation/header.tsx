import { Fragment, useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'


import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import menuAdapter from '../../adapters/menuAdapter';
import Link from 'next/link';

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']



export default function Header(menu) {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [menuStructure, setMenuStructure] = useState([]);

    useEffect(() => {
        const { buildMenuStructure } = menuAdapter(menu);
        const menuTree = buildMenuStructure();
        setMenuStructure(menuTree);
    }, [menu]);

    return (
        <>
            {/* Mobile menu */}

            <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white/[.975] pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <div className="flex px-4 pb-2 pt-5">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {menuStructure.map((item) => (
                                        item.children.length > 0 ? (
                                            <Disclosure key={item.node.id} as="div" className="-mx-3">
                                                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50">
                                                    {item.node.label}
                                                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                                                </DisclosureButton>
                                                <DisclosurePanel className="mt-2 space-y-2">
                                                    {item.children.map((child) => (
                                                        <DisclosureButton
                                                            key={child.node.id}
                                                            as="a"
                                                            href={child.node.uri}
                                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                        >
                                                            {child.node.datamenuitem.image && (
                                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                                    <img
                                                                        alt={child.node.datamenuitem.image.node.altText}
                                                                        src={child.node.datamenuitem.image.node.sourceUrl}
                                                                        className="object-cover object-center"
                                                                    />
                                                                </div>
                                                            )}
                                                            {child.node.label}
                                                        </DisclosureButton>
                                                    ))}
                                                </DisclosurePanel>
                                            </Disclosure>
                                        ) : (
                                            <Link key={item.node.id} href={item.node.uri} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                {item.node.label}
                                            </Link>
                                        )
                                    ))}
                                </div>
                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>


            {/* Navigation */}
            <header className="fixed w-full z-10 px-4 pt-2">
                <nav aria-label="Top">
                    {/* Top navigation */}
                    {/* <div className="bg-gray-900">
                        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <form>
                                <div>
                                    <label htmlFor="desktop-currency" className="sr-only">
                                        Currency
                                    </label>
                                    <div className="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                                        <select
                                            id="desktop-currency"
                                            name="currency"
                                            className="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
                                        >
                                            {currencies.map((currency) => (
                                                <option key={currency}>{currency}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className="flex items-center space-x-6">
                                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                    Sign in
                                </a>
                                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                    Create an account
                                </a>
                            </div>
                        </div>
                    </div> */}

                    {/* Secondary navigation */}
                    <div className="bg-white/[.9] shadow-sm overflow-hidden rounded-full border-solid border border-gray-200 ">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div>
                                <div className="flex h-16 items-center justify-between">
                                    {/* Logo (lg+) */}
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                        <Link href="/">
                                            <span className="sr-only">Siège ergonomique</span>
                                            <img
                                                alt={menu.menu.datamenu.logo.node.altText}
                                                src={menu.menu.datamenu.logo.node.sourceUrl}
                                                className="max-h-7 w-auto"
                                            />
                                        </Link>
                                    </div>

                                    <div className="hidden h-full lg:flex">
                                        {/* Flyout menus */}
                                        <PopoverGroup className="inset-x-0 bottom-0 px-4">
                                            <div className="flex h-full justify-center space-x-8">
                                                {menuStructure.map((category) => (
                                                    category.children.length > 0 ? (
                                                        <Popover key={category.node.id} className="flex">
                                                            <div className="relative flex">
                                                                <PopoverButton className="group relative flex items-center justify-center text-sm font-medium outline-none text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:text-indigo-600">
                                                                    {category.node.label}
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="absolute inset-x-0 bottom-0.5 z-30 h-0.5 transition duration-200 ease-out group-data-[open]:bg-indigo-600"
                                                                    />
                                                                </PopoverButton>
                                                            </div>

                                                            <PopoverPanel
                                                                transition
                                                                className="absolute inset-x-0 top-full text-sm text-gray-500 p-4 pt-2 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                                            >
                                                                {({ close }) => (
                                                                    <>
                                                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                                        <div aria-hidden="true" className="absolute inset-0 top-1/2 shadow m-4 mt-2 rounded-xl" />

                                                                        <div className="relative bg-white/[.975] overflow-hidden rounded-xl border-solid border border-gray-200 ">
                                                                            {/* <div className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"><div className="h-px w-full bg-gray-200 transition-colors duration-200 ease-out"></div></div> */}
                                                                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                                                <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-8">
                                                                                    {category.children.map((item) => (
                                                                                        <div key={item.node.label} className="group relative">
                                                                                            {item.node.datamenuitem.image && (
                                                                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                                                                    <img
                                                                                                        alt={item.node.datamenuitem.image.node.altText}
                                                                                                        src={item.node.datamenuitem.image.node.sourceUrl}
                                                                                                        className="object-cover object-center"
                                                                                                    />
                                                                                                </div>
                                                                                            )}
                                                                                            <Link onClick={() => close()} href={item.node.uri} className="mt-4 block font-medium text-gray-900">
                                                                                                <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                                                {item.node.label}
                                                                                            </Link>
                                                                                            <p aria-hidden="true" className="mt-1">
                                                                                                Consulter
                                                                                            </p>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </PopoverPanel>
                                                        </Popover>
                                                    ) : (
                                                        <Link onClick={() => close()} key={category.node.id} href={category.node.uri} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                                            {category.node.label}
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        </PopoverGroup>
                                    </div>

                                    {/* Mobile menu and search (lg-) */}
                                    <div className="flex flex-1 items-center lg:hidden">
                                        <button type="button" onClick={() => setMobileMenuOpen(true)} className="-ml-2 rounded-md p-2 text-gray-400">
                                            <span className="sr-only">Open menu</span>
                                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                                        </button>

                                        {/* Search */}
                                        {/* <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                                        </a> */}
                                    </div>

                                    {/* Logo (lg-) */}
                                    <Link href="#" className="lg:hidden">
                                        <span className="sr-only">Siège ergonomique</span>
                                        <img
                                            alt={menu.menu.datamenu.logo.node.altText}
                                            src={menu.menu.datamenu.logo.node.sourceUrl}
                                            className="max-h-7 w-auto"
                                        />
                                    </Link>

                                    <div className="flex flex-1 items-center justify-end">
                                        <Link href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Help</span>
                                            <QuestionMarkCircleIcon aria-hidden="true" className="h-6 w-6" />
                                        </Link>
                                        <Link href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                                        </Link>

                                        <div className="hidden items-center lg:ml-6 md:flex">
                                            <Link href="/produits" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                                                Voir les produits
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}