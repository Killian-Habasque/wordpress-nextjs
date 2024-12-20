import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type FAQItem = {
    label: string
    text: string
}

type FAQProps = {
    text: string
    accordion: FAQItem[]
}

export default function Accordion({ text, accordion }: FAQProps) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <div className="txt-group" dangerouslySetInnerHTML={{ __html: text }} />
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {accordion.map((item, index) => (
                            <Disclosure as="div" key={index} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="text-base font-semibold leading-7">
                                                    {item.label}
                                                </span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    <ChevronDownIcon
                                                        className={`h-6 w-6 transform ${open ? 'rotate-180' : 'rotate-0'
                                                            } transition-transform duration-200 ease-in-out`}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </DisclosureButton>
                                        </dt>
                                        <DisclosurePanel as="dd" className="mt-2 pr-12">
                                            <p className="text-base leading-7 text-gray-600">
                                                {item.text}
                                            </p>
                                        </DisclosurePanel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}