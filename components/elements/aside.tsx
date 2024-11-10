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
import { ChevronDownIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';

const filters_static = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White' },
            { value: 'beige', label: 'Beige' },
            { value: 'blue', label: 'Blue' },
            { value: 'brown', label: 'Brown' },
            { value: 'green', label: 'Green' },
            { value: 'purple', label: 'Purple' },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'All New Arrivals' },
            { value: 'tees', label: 'Tees' },
            { value: 'crewnecks', label: 'Crewnecks' },
            { value: 'sweatshirts', label: 'Sweatshirts' },
            { value: 'pants-shorts', label: 'Pants & Shorts' },
        ],
    },
    {
        id: 'sizes',
        name: 'Sizes',
        options: [
            { value: 'xs', label: 'XS' },
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
            { value: 'xl', label: 'XL' },
            { value: '2xl', label: '2XL' },
        ],
    },
]

export default function Aside({ filters }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (
        <>
            <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                    >
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(false)}
                                className="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4">

                            <Disclosure as="div" className="border-t border-gray-200 pb-4 pt-4">
                                <fieldset>
                                    <legend className="w-full px-2">
                                        <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                            <span className="text-sm font-medium text-gray-900">Test</span>
                                            <span className="ml-6 flex h-7 items-center">
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                                                />
                                            </span>
                                        </DisclosureButton>
                                    </legend>
                                    <DisclosurePanel className="px-4 pb-2 pt-4">
                                        <div className="space-y-6">
                                            {filters.productTags.nodes.map((option, optionIdx) => (
                                                <div key={optionIdx} className="flex items-center">
                                                    <input
                                                        defaultValue={option.value}
                                                        id={`${optionIdx}-mobile`}
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor={`${option.id}-${optionIdx}-mobile`}
                                                        className="ml-3 text-sm text-gray-500"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </DisclosurePanel>
                                </fieldset>
                            </Disclosure>

                            {filters_static.map((section, sectionIdx) => (
                                <Disclosure key={sectionIdx} as="div" className="border-t border-gray-200 pb-4 pt-4">
                                    <fieldset>
                                        <legend className="w-full px-2">
                                            <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <ChevronDownIcon
                                                        aria-hidden="true"
                                                        className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                                                    />
                                                </span>
                                            </DisclosureButton>
                                        </legend>
                                        <DisclosurePanel className="px-4 pb-2 pt-4">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={optionIdx} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            id={`${section.id}-${optionIdx}-mobile`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`${section.id}-${optionIdx}-mobile`}
                                                            className="ml-3 text-sm text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </fieldset>
                                </Disclosure>
                            ))}
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>


            <aside>
                <h2 className="sr-only">Filters</h2>

                <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex items-center lg:hidden"
                >
                    <span className="text-sm font-medium text-gray-700">Filters</span>
                    <PlusIcon aria-hidden="true" className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                </button>

                <div className="hidden lg:block">
                    <form className="space-y-10 divide-y divide-gray-200">
                        {/* {filters.map((section, sectionIdx) => (
                    <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                        <div className="space-y-3 pt-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                defaultValue={option.value}
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))} */}
                        <div key={"brand"}>
                            <fieldset>
                                <legend className="block text-sm font-medium text-gray-900">Marques</legend>
                                <div className="space-y-3 pt-6">
                                    {filters.brands.nodes.map((option, optionIdx) => (
                                        <div key={optionIdx} className="flex items-center">
                                            <input
                                                defaultValue={option.slug}
                                                id={`${option.id}-${optionIdx}`}
                                                name={`${option.id}[]`}
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor={`${option.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                {option.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                        <div key={"tags"} className="pt-10">
                            <fieldset>
                                <legend className="block text-sm font-medium text-gray-900">Filtres</legend>
                                <div className="space-y-3 pt-6">
                                    {filters.productTags.nodes.map((option, optionIdx) => (
                                        <div key={optionIdx} className="flex items-center">
                                            <input
                                                defaultValue={option.value}
                                                id={`${option.id}-${optionIdx}`}
                                                name={`${option.id}[]`}
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor={`${option.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                {option.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </form>
                </div>
            </aside>
        </>
    );
}
