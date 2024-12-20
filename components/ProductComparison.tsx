import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

type Feature = {
  name: string
  description: string
}

type Product = {
  id: number
  name: string
  price: number
  image: string
  rating: number
  features: {
    [key: string]: boolean | string | number
  }
}

const features: Feature[] = [
  { 
    name: "Livraison gratuite", 
    description: "Livraison offerte en point relais" 
  },
  { 
    name: "Garantie", 
    description: "Durée de la garantie en années" 
  },
  { 
    name: "Stock", 
    description: "Disponibilité du produit" 
  },
  { 
    name: "Retour gratuit", 
    description: "Retour gratuit sous 30 jours" 
  },
  { 
    name: "Made in France", 
    description: "Produit fabriqué en France" 
  }
]

// Données de test
const products: Product[] = [
  {
    id: 1,
    name: "Produit Basic",
    price: 79.99,
    image: "/images/default-image.png",
    rating: 4,
    features: {
      "Livraison gratuite": true,
      "Garantie": "2 ans",
      "Stock": "En stock",
      "Retour gratuit": true,
      "Made in France": false,
    },
  },
  {
    id: 2,
    name: "Produit Premium",
    price: 149.99,
    image: "/images/default-image.png",
    rating: 5,
    features: {
      "Livraison gratuite": true,
      "Garantie": "5 ans",
      "Stock": "En stock",
      "Retour gratuit": true,
      "Made in France": true,
    },
  },
  {
    id: 3,
    name: "Produit Standard",
    price: 99.99,
    image: "/images/default-image.png",
    rating: 4.5,
    features: {
      "Livraison gratuite": false,
      "Garantie": "3 ans",
      "Stock": "Sur commande",
      "Retour gratuit": true,
      "Made in France": true,
    },
  },
]

export default function ProductComparison() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Comparer les produits
          </h2>

          {/* Table de comparaison */}
          <div className="mt-16 flow-root">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-300">
                  {/* En-tête avec les produits */}
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Caractéristiques
                      </th>
                      {products.map((product) => (
                        <th key={product.id} scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          <div className="flex flex-col items-center">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-24 h-24 object-cover rounded-lg mb-2"
                            />
                            <span>{product.name}</span>
                            <span className="text-lg font-bold mt-1">{product.price} €</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {/* Corps du tableau avec les caractéristiques */}
                  <tbody className="divide-y divide-gray-200">
                    {features.map((feature) => (
                      <tr key={feature.name}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <div>
                            {feature.name}
                            <p className="font-normal text-gray-500">{feature.description}</p>
                          </div>
                        </td>
                        {products.map((product) => (
                          <td key={`${product.id}-${feature.name}`} className="px-3 py-4 text-center">
                            {typeof product.features[feature.name] === 'boolean' ? (
                              product.features[feature.name] ? (
                                <CheckIcon className="mx-auto h-5 w-5 text-green-500" />
                              ) : (
                                <XMarkIcon className="mx-auto h-5 w-5 text-red-500" />
                              )
                            ) : (
                              <span className="text-sm text-gray-700">
                                {product.features[feature.name]}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 