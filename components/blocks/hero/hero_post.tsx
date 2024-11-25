import { useState } from 'react'
import {
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline'

import { StarIcon } from '@heroicons/react/20/solid'
import Categories from '../../elements/categories'
import PostTitle from '../../elements/title'
import Date from '../../elements/date'
import Avatar from '../../elements/avatar'



export default function HeroPost({ title, excerpt, coverImage, author, date, categories }) {

    return (
        <section className="block hero_bg_image">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none md:leading-none mb-6 text-center md:text-left font-bold tracking-tight text-gray-900">{title}</h1>

                <div className="hidden md:block md:mb-2">
                    <Avatar author={author} />
                </div>
                <div className="hidden md:block md:mb-6">
                    Posté le <Date dateString={date} />
                </div>

                <div className="relative overflow-hidden rounded-lg aspect-[21/9] ">
                    <img
                        alt={`Cover Image for ${title}`}
                        src={coverImage?.node.sourceUrl}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="mb-6">
                    <Categories categories={categories.edges} />
                </div>


                <div
                    className="text-lg leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                />
                <div className="max-w-2xl mx-auto">
                    <div className="block md:hidden mb-6">
                        <Avatar author={author} />
                    </div>
                    <div className="block md:hidden mb-6">
                        Posté le <Date dateString={date} />
                    </div>
                </div>
            </div>
        </section>
    );
}