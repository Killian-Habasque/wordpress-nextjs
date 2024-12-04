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


export default function Aside({ filters, onTagChange }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const transformTagsToFilters = (data) => {
        const parentTags = data.productTags.edges
            .map(edge => edge.node)
            .filter(node => node.children.edges.length > 0);

        return parentTags.map(parent => ({
            id: parent.slug,
            name: parent.name,
            options: parent.children.edges.map(child => ({
                id: child.node.databaseId,
                value: child.node.slug,
                label: child.node.name,
            }))
        }));
    };
    const tags = transformTagsToFilters(filters)



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

                            {/* <Disclosure as="div" className="border-t border-gray-200 pb-4 pt-4">
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
                            </Disclosure> */}
                            {tags.map((tagGroup) => (
                                <Disclosure key={tagGroup.id} as="div" className="border-t border-gray-200 pb-4 pt-4">
                                    <fieldset>
                                        <legend className="w-full px-2">
                                            <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                                <span className="text-sm font-medium text-gray-900">{tagGroup.name}</span>
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
                                                {tagGroup.options.map((option, optionIdx) => (
                                                    <div key={optionIdx} className="flex items-center">
                                                        <input
                                                            defaultValue={option.id}
                                                            id={`${tagGroup.id}-${optionIdx}-mobile`}
                                                            name={`${tagGroup.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            onChange={() => onTagChange(option.id)}
                                                        />
                                                        <label
                                                            htmlFor={`${tagGroup.id}-${optionIdx}-mobile`}
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
                        {/* <div key={"brand"}>
                            <fieldset>
                                <legend className="block text-sm font-medium text-gray-900">Marques</legend>
                                <div className="space-y-3 pt-3">
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
                        </div> */}
                        {tags.map((tagGroup) => (
                            <div key={tagGroup.id} className="space-y-3 pt-6">
                                <h3 className="text-sm font-medium text-gray-900">{tagGroup.name}</h3>
                                {tagGroup.options.map((option) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={option.value}
                                            // checked={selectedTags.includes(option.value)}
                                            onChange={() => onTagChange(option.id)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor={option.value} className="ml-3 text-sm text-gray-500">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}

                    </form>
                </div>
            </aside>
        </>
    );
}
