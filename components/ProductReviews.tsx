import { StarIcon } from '@heroicons/react/20/solid'

type Review = {
  id: number
  rating: number
  author: string
  date: string
  title: string
  content: string
}

type ProductReviewsProps = {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const reviews = [
  {
    id: 1,
    rating: 5,
    author: "Marie D.",
    date: "12 mars 2024",
    title: "Excellent produit !",
    content: "Je suis très satisfaite de mon achat. La qualité est au rendez-vous et le rapport qualité-prix est excellent."
  },
  {
    id: 2,
    rating: 4,
    author: "Pierre L.",
    date: "10 mars 2024",
    title: "Très bon produit malgré quelques défauts",
    content: "Le produit correspond globalement à mes attentes. Seul bémol : la livraison a pris un peu plus de temps que prévu."
  },
  {
    id: 3,
    rating: 5,
    author: "Sophie M.",
    date: "5 mars 2024",
    title: "Je recommande !",
    content: "Parfait en tout point. La livraison était rapide et le produit est conforme à la description."
  }
]

const averageRating = 4.7
const totalReviews = 3

export default function ProductReviews() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-medium text-gray-900">Avis clients</h2>
        
        {/* Résumé des avis */}
        <div className="mt-6 flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  averageRating > rating ? 'text-yellow-400' : 'text-gray-200',
                  'h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="ml-3 text-sm text-gray-700">
            {averageRating} sur 5 ({totalReviews} avis)
          </p>
        </div>

        {/* Liste des avis */}
        <div className="mt-10 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
          {reviews.map((review) => (
            <div key={review.id} className="pt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">{review.title}</h3>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <div className="mt-2 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="mt-4 space-y-6 text-sm text-gray-600">
                <p>{review.content}</p>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <span>Par {review.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 