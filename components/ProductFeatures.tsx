import { CheckCircleIcon, BoltIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

type Feature = {
  name: string
  description: string
  icon: React.ForwardRefExoticComponent<any>
}

type FeatureCategory = {
  title: string
  description: string
  features: Feature[]
}

const categories: FeatureCategory[] = [
  {
    title: "Performance",
    description: "Des caractéristiques techniques exceptionnelles",
    features: [
      {
        name: "Haute performance",
        description: "Processeur dernière génération pour des performances optimales",
        icon: BoltIcon,
      },
      {
        name: "Qualité premium",
        description: "Matériaux haut de gamme sélectionnés avec soin",
        icon: CheckCircleIcon,
      },
      {
        name: "Livraison rapide",
        description: "Expédition sous 24h pour toute commande passée avant 15h",
        icon: TruckIcon,
      },
      {
        name: "Garantie étendue",
        description: "Garantie 2 ans pièces et main d'œuvre incluse",
        icon: ShieldCheckIcon,
      },
    ],
  },
  {
    title: "Spécifications",
    description: "Caractéristiques techniques détaillées",
    features: [
      {
        name: "Design compact",
        description: "Dimensions optimisées pour un encombrement minimal",
        icon: CheckCircleIcon,
      },
      {
        name: "Installation facile",
        description: "Mise en service rapide grâce au guide d'installation",
        icon: BoltIcon,
      },
      {
        name: "Maintenance réduite",
        description: "Conception robuste nécessitant peu d'entretien",
        icon: ShieldCheckIcon,
      },
      {
        name: "Support premium",
        description: "Assistance technique dédiée 6j/7",
        icon: TruckIcon,
      },
    ],
  },
]

export default function ProductFeatures() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {categories.map((category, categoryIdx) => (
          <div
            key={category.title}
            className={categoryIdx > 0 ? 'mt-32' : undefined}
          >
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                {category.title}
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {category.description}
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                {category.features.map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon
                        className="h-5 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))}

        {/* Section des spécifications techniques */}
        <div className="mt-32">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Spécifications techniques
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Caractéristiques détaillées
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
              <dl className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Dimensions</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Hauteur : 10 cm</li>
                      <li>Largeur : 20 cm</li>
                      <li>Profondeur : 15 cm</li>
                      <li>Poids : 1.2 kg</li>
                    </ul>
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Matériaux</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    <ul className="list-inside list-disc space-y-1">
                      <li>Structure en aluminium</li>
                      <li>Finition anodisée</li>
                      <li>Joints en silicone</li>
                      <li>Composants certifiés</li>
                    </ul>
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Certifications</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    <ul className="list-inside list-disc space-y-1">
                      <li>CE</li>
                      <li>RoHS</li>
                      <li>ISO 9001</li>
                      <li>Energy Star</li>
                    </ul>
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Garantie</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    <ul className="list-inside list-disc space-y-1">
                      <li>2 ans pièces et main d'œuvre</li>
                      <li>Extension possible à 5 ans</li>
                      <li>Support technique dédié</li>
                      <li>Remplacement express</li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 