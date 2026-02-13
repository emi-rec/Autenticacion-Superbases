import { useState, useEffect } from 'react'
import { supabase } from '@/superBase/supabaseClient'
import { User } from '@supabase/supabase-js'
import { WeatherResponse } from '@/types/weather'
import { useFetch } from '@/hooks/useFetch'
import { useToast } from '@/hooks/use-toast'

interface Favorite {
  id: string
  city_name: string
  user_id: string
}

export function useWeatherDashboard(user: User | null) {
  const { toast } = useToast()
  const [activeQuery, setActiveQuery] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Favorite[]>([])

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setActiveQuery(
          `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`,
        ),
      () => setActiveQuery('q=Madrid'),
    )
  }, [])

  const url = activeQuery
    ? `https://api.openweathermap.org/data/2.5/weather?${activeQuery}&units=metric&appid=${API_KEY}&lang=es`
    : null
  const { data: weather, loading, error } = useFetch<WeatherResponse>(url)

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const { data } = await supabase
          .from('favorites')
          .select('id, city_name, user_id')
          .order('created_at', { ascending: false })
        if (data) setFavorites(data as Favorite[])
      }
      fetchFavorites()
    }
  }, [user])

  // FUNCIÓN PARA BORRAR POR ID (Para la "X" de los botones)
  const removeFavoriteById = async (id: string) => {
    try {
      const { error: dbError } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id)
      if (dbError) throw dbError

      setFavorites((prev) => prev.filter((f) => f.id !== id))
      toast({ title: 'Eliminado', description: 'Ciudad quitada de favoritos.' })
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar.',
      })
    }
  }

  // FUNCIÓN PARA LA ESTRELLA (Toggle)
  const toggleFavorite = async () => {
    if (!weather || !user) return

    try {
      const isFav = favorites.find(
        (f) => f.city_name.toLowerCase() === weather.name.toLowerCase(),
      )

      if (isFav) {
        await removeFavoriteById(isFav.id)
      } else {
        const { data, error: dbError } = await supabase
          .from('favorites')
          .insert([{ city_name: weather.name, user_id: user.id }])
          .select()

        if (dbError) throw dbError
        if (data) setFavorites((prev) => [data[0] as Favorite, ...prev])
        toast({ title: '¡Guardado!', description: `${weather.name} agregada.` })
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Fallo en la operación.',
      })
    }
  }

  return {
    weather,
    loading,
    error,
    favorites,
    handleSearch: (city: string) => setActiveQuery(`q=${city}`),
    toggleFavorite,
    removeFavoriteById, // <-- Exportamos esta nueva función
    isFavorite: !!favorites.find(
      (f) => f.city_name.toLowerCase() === weather?.name.toLowerCase(),
    ),
  }
}
