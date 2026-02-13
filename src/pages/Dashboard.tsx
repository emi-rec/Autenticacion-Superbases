import { useAuth } from '@/hooks/useAuth'
import { useWeatherDashboard } from '@/hooks/useWeatherDashboard'
import {
  WeatherHeader,
  WeatherContent,
  WeatherLoader,
  WeatherError,
  WeatherFavorites,
  getWeatherStyle,
} from '@/components/dashboard'
import { Card, CardContent } from '@/components/ui/card'

export default function Dashboard() {
  const { user } = useAuth()

  const {
    weather,
    loading,
    error,
    favorites,
    handleSearch,
    toggleFavorite,
    isFavorite,
    removeFavoriteById,
  } = useWeatherDashboard(user)

  // Calculamos el estilo basado en el icono de la API
  const style = weather ? getWeatherStyle(weather.weather[0].icon) : null

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-5xl">
      {/* 1. Cabecera y Buscador */}
      <WeatherHeader
        email={user?.email}
        loading={loading}
        onSearch={handleSearch}
      />

      {/* 2. Lista de Favoritos */}
      <WeatherFavorites
        favorites={favorites}
        onSelect={handleSearch}
        onRemove={(id: string) => removeFavoriteById(id)}
      />

      {/* 3. Tarjeta Principal de Clima */}
      <Card
        className={`overflow-hidden border-none shadow-2xl transition-all duration-500 bg-gradient-to-br ${style?.gradient || 'from-slate-500 to-slate-700'} text-white`}
      >
        <CardContent className="p-8">
          {loading ? (
            <WeatherLoader />
          ) : error ? (
            <WeatherError onRetry={() => handleSearch('Madrid')} />
          ) : weather && style ? (
            <WeatherContent
              weather={weather}
              style={style}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
