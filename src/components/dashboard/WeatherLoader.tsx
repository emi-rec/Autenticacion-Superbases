import { Loader2 } from 'lucide-react'

export const WeatherLoader = () => (
  <div className="flex h-48 flex-col items-center justify-center gap-4 text-white/70 font-medium">
    <Loader2 className="h-10 w-10 animate-spin opacity-50" />
    <p className="animate-pulse">Consultando a los satélites...</p>
  </div>
)
