import { Button } from '@/components/ui/button'
import { Star, X } from 'lucide-react'

interface Favorite {
  id: string
  city_name: string
}

interface WeatherFavoritesProps {
  favorites: Favorite[]
  onSelect: (city: string) => void
  onRemove: (id: string) => void
}

export function WeatherFavorites({
  favorites,
  onSelect,
  onRemove,
}: WeatherFavoritesProps) {
  if (favorites.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {favorites.map((fav) => (
        <div key={fav.id} className="group relative">
          <Button
            variant="secondary"
            size="sm"
            className="pr-8 rounded-full bg-white/50 hover:bg-white"
            onClick={() => onSelect(fav.city_name)}
          >
            <Star className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-500" />
            {fav.city_name}
          </Button>
          <button
            onClick={() => onRemove(fav.id)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
