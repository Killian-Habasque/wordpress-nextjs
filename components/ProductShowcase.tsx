import { StarIcon } from '@heroicons/react/20/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

type ProductHighlight = {
  title: string
  description: string
  image: string
  features: string[]
  rating: number
  price: number
  cta: {
    text: string
    link: string
  }
}

// Données de test
const highlights: ProductHighlight[] = [
  {
    title: "Produit Premium",
    description: "Notre meilleure qualité pour les plus exigeants. Design élégant et performances exceptionnelles.",
    image: "/images/default-image.png",
    features: [
      "Matériaux haut de gamme",
      "Garantie 5 ans",
      "SAV premium",
      "Livraison express offerte"
    ],
    rating: 5,
    price: 149.99,
    cta: {
      text: "Découvrir le produit",
      link: "#"
    }
  },
  {
    title: "Édition Limitée",
    description: "Une série spéciale avec finitions exclusives. Disponible en quantité limitée.",
    image: "/images/default-image.png",
    features: [
      "Numéroté individuellement",
      "Certificat d'authenticité",
      "Coffret collector",
      "Design unique"
    ],
    rating: 4.8,
    price: 199.99,
    cta: {
      text: "Voir la collection",
      link: "#"
    }
  }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function () {
  return (
    <div className="bg-white">
      {/* Section Hero avec image pleine largeur */}
      <div className="relative">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                {highlights[0].title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {highlights[0].description}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href={highlights[0].cta.link}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {highlights[0].cta.text}
                </a>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              src={highlights[0].image}
              alt={highlights[0].title}
            />
          </div>
        </div>
      </div>

      {/* Section avec alternance image/texte */}
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {highlights.map((highlight, index) => (
            <div
              key={highlight.title}
              className={classNames(
                'mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2',
                index % 2 === 0 ? 'lg:items-start' : 'lg:items-center pt-24'
              )}
            >
              <div className={classNames(
                'lg:pt-4',
                index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 order-last lg:order-first'
              )}>
                <div className="lg:max-w-lg">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {highlight.title}
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    {highlight.description}
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            highlight.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      {highlight.rating} sur 5
                    </p>
                  </div>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                    {highlight.features.map((feature) => (
                      <div key={feature} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <ArrowRightIcon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                        </dt>{' '}
                        <dd className="inline">{feature}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-10">
                    <span className="text-2xl font-bold tracking-tight text-gray-900">
                      {highlight.price} €
                    </span>
                    <a
                      href={highlight.cta.link}
                      className="ml-6 inline-block rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {highlight.cta.text}
                    </a>
                  </div>
                </div>
              </div>
              <div className={classNames(
                'flex items-start justify-end lg:order-last',
                index % 2 === 0 ? '' : 'lg:order-first'
              )}>
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 