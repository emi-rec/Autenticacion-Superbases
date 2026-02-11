import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useFetch } from '@/hooks/useFetch'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { WeatherResponse } from '@/types/weather'
import {
  WeatherHeader,
  WeatherContent,
  WeatherLoader,
  WeatherError,
  getWeatherStyle,
} from '@/components/dashboard'

export default function Dashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeQuery, setActiveQuery] = useState<string | null>(null)

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setActiveQuery(
          `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`,
        ),
      () => {
        setActiveQuery('q=Madrid')
        toast({
          title: 'GPS no disponible',
          description: 'Mostrando Madrid por defecto.',
        })
      },
    )
  }, [toast])

  const url = activeQuery
    ? `https://api.openweathermap.org/data/2.5/weather?${activeQuery}&units=metric&appid=${API_KEY}&lang=es`
    : null

  const { data: weather, loading, error } = useFetch<WeatherResponse>(url)

  const handleSearch = (city: string) => {
    setActiveQuery(`q=${city}`)
  }

  const style = weather ? getWeatherStyle(weather.weather[0].icon) : null

  return (
    <div className="space-y-6">
      <WeatherHeader
        email={user?.email}
        loading={loading}
        onSearch={handleSearch}
      />

      <Card
        className={`overflow-hidden border-none shadow-2xl bg-gradient-to-br ${style?.gradient || 'from-slate-800 to-slate-900'} text-white`}
      >
        <CardContent className="p-8">
          {loading ? (
            <WeatherLoader />
          ) : error ? (
            <WeatherError onRetry={() => setActiveQuery('q=Madrid')} />
          ) : (
            weather &&
            style && <WeatherContent weather={weather} style={style} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
