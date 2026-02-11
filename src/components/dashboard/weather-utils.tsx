import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  CloudDrizzle,
} from 'lucide-react'
import { WeatherStyle } from '@/types/weather'

export const getWeatherStyle = (iconCode: string): WeatherStyle => {
  const styles: Record<string, WeatherStyle> = {
    // CIELO CLARO
    '01d': {
      icon: <Sun className="h-16 w-16 text-yellow-300 animate-pulse" />,
      gradient: 'from-orange-400 to-amber-600',
    },
    '01n': {
      icon: <Moon className="h-16 w-16 text-slate-100" />,
      gradient: 'from-slate-800 to-slate-950',
    },

    // NUBES (02: Pocas nubes, 03: Nubes dispersas, 04: Nublado)
    '02d': {
      icon: <Cloud className="h-16 w-16 text-slate-100" />,
      gradient: 'from-blue-400 to-slate-500',
    },
    '02n': {
      icon: <Cloud className="h-16 w-16 text-slate-300" />,
      gradient: 'from-slate-700 to-slate-900',
    },
    '03d': {
      icon: <Cloud className="h-16 w-16 text-slate-200" />,
      gradient: 'from-slate-400 to-slate-600',
    },
    '03n': {
      icon: <Cloud className="h-16 w-16 text-slate-400" />,
      gradient: 'from-slate-800 to-slate-900',
    },
    '04d': {
      icon: <Cloud className="h-16 w-16 text-slate-300" />,
      gradient: 'from-gray-500 to-gray-700',
    },
    '04n': {
      icon: <Cloud className="h-16 w-16 text-slate-500" />,
      gradient: 'from-gray-800 to-black',
    },

    // LLUVIA Y LLOVIZNA
    '09d': {
      icon: <CloudDrizzle className="h-16 w-16 text-blue-200" />,
      gradient: 'from-indigo-400 to-cyan-600',
    },
    '09n': {
      icon: <CloudDrizzle className="h-16 w-16 text-blue-400" />,
      gradient: 'from-indigo-900 to-slate-900',
    },
    '10d': {
      icon: <CloudRain className="h-16 w-16 text-blue-300" />,
      gradient: 'from-blue-600 to-blue-900',
    },
    '10n': {
      icon: <CloudRain className="h-16 w-16 text-blue-500" />,
      gradient: 'from-blue-900 to-black',
    },

    // TORMENTA
    '11d': {
      icon: <CloudLightning className="h-16 w-16 text-yellow-400" />,
      gradient: 'from-purple-700 to-slate-900',
    },
    '11n': {
      icon: <CloudLightning className="h-16 w-16 text-yellow-600" />,
      gradient: 'from-purple-900 to-black',
    },

    // NIEVE
    '13d': {
      icon: <CloudSnow className="h-16 w-16 text-white" />,
      gradient: 'from-blue-100 to-blue-300',
    },
    '13n': {
      icon: <CloudSnow className="h-16 w-16 text-blue-100" />,
      gradient: 'from-blue-900 to-slate-700',
    },

    // NIEBLA / BRUMA
    '50d': {
      icon: <CloudFog className="h-16 w-16 text-slate-200" />,
      gradient: 'from-gray-400 to-gray-600',
    },
    '50n': {
      icon: <CloudFog className="h-16 w-16 text-slate-400" />,
      gradient: 'from-gray-700 to-gray-900',
    },
  }

  return (
    styles[iconCode] || {
      icon: <Cloud className="h-16 w-16 text-slate-300" />,
      gradient: 'from-slate-500 to-slate-700',
    }
  )
}
