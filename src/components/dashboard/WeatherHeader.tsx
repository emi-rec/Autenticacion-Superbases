import { WeatherSearch } from './WeatherSearch'

interface WeatherHeaderProps {
  email?: string
  loading: boolean
  onSearch: (city: string) => void
}

export function WeatherHeader({
  email,
  loading,
  onSearch,
}: WeatherHeaderProps) {
  const userName = email?.split('@')[0] ?? 'Usuario'

  const dateFormatted = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-slate-500 text-3xl tracking-tight">
          Bienvenido,{' '}
          <span className="font-bold text-slate-800 capitalize">
            {userName}! 👋
          </span>
        </h2>
        <p className="text-sm font-medium text-slate-500 italic first-letter:uppercase">
          {dateFormatted}
        </p>
      </div>

      <WeatherSearch onSearch={onSearch} loading={loading} />
    </div>
  )
}
