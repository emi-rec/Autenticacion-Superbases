// import { MapPin, Droplets, Wind, Sun, Thermometer, Star } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { WeatherResponse, WeatherStyle } from '@/types/weather'
// import WeatherDetail from './WeatherDetail'

// interface WeatherContentProps {
//   weather: WeatherResponse
//   style: WeatherStyle
//   isFavorite: boolean
//   onToggleFavorite: () => void
// }

// export function WeatherContent({
//   weather,
//   style,
//   isFavorite,
//   onToggleFavorite,
// }: WeatherContentProps) {
//   return (
//     <div className="grid lg:grid-cols-2 gap-12 items-center relative">
//       {/* Botón de Favorito */}
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={onToggleFavorite}
//         className="absolute -top-2 -right-2 text-white hover:bg-white/20 rounded-full transition-colors"
//       >
//         <Star
//           className={`h-7 w-7 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`}
//         />
//       </Button>
//       {/* Lado Izquierdo: Principal (Icono y Temp) */}
//       <div className="flex items-center gap-8">
//         <div className="p-5 bg-white/20 backdrop-blur-xl rounded-[2.5rem] shadow-inner">
//           {style.icon}
//         </div>
//         <div>
//           <div className="flex items-center gap-2 text-white/80 mb-1">
//             <MapPin size={18} />
//             <span className="font-bold tracking-widest uppercase text-sm">
//               {weather.name}, {weather.sys.country}
//             </span>
//           </div>
//           <div className="text-8xl font-black tracking-tighter leading-none mb-2">
//             {Math.round(weather.main.temp)}°
//           </div>
//           <p className="text-2xl capitalize font-light text-white/90 italic">
//             {weather.weather[0].description}
//           </p>
//         </div>
//       </div>

//       {/* Lado Derecho: Detalles Secundarios */}
//       <div className="grid grid-cols-2 gap-4">
//         <WeatherDetail
//           icon={<Droplets className="text-blue-300" />}
//           label="Humedad"
//           value={`${weather.main.humidity}%`}
//         />
//         <WeatherDetail
//           icon={<Wind className="text-slate-300" />}
//           label="Viento"
//           value={`${weather.wind.speed} m/s`}
//         />
//         <WeatherDetail
//           icon={<Sun className="text-yellow-300" />}
//           label="Máxima"
//           value={`${Math.round(weather.main.temp_max)}°`}
//         />
//         <WeatherDetail
//           icon={<Thermometer className="text-red-300" />}
//           label="Mínima"
//           value={`${Math.round(weather.main.temp_min)}°`}
//         />
//       </div>
//     </div>
//   )
// }

import { MapPin, Droplets, Wind, Sun, Thermometer, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WeatherResponse, WeatherStyle } from '@/types/weather'
import WeatherDetail from './WeatherDetail'

interface WeatherContentProps {
  weather: WeatherResponse
  style: WeatherStyle
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function WeatherContent({
  weather,
  style,
  isFavorite,
  onToggleFavorite,
}: WeatherContentProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center relative text-white">
      {/* Lado Izquierdo: Principal (Icono y Temp) */}
      <div className="flex items-center gap-8">
        <div className="p-5 bg-white/20 backdrop-blur-xl rounded-[2.5rem] shadow-inner animate-in fade-in zoom-in duration-500">
          {style.icon}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center gap-2 text-white/80 mb-1">
              <MapPin size={18} />
              <span className="font-bold tracking-widest uppercase text-sm">
                {weather.name}, {weather.sys.country}
              </span>
            </div>
            {/* Botón de Favorito - Esquina superior derecha */}

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className="hover:bg-white/20 rounded-full transition-all active:scale-90"
              title={
                isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'
              }
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  isFavorite
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-white/70 hover:text-white'
                }`}
              />
            </Button>
          </div>

          <div className="text-8xl font-black tracking-tighter leading-none mb-2">
            {Math.round(weather.main.temp)}°
          </div>
          <p className="text-2xl capitalize font-light text-white/90 italic">
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      {/* Lado Derecho: Detalles Secundarios */}
      <div className="grid grid-cols-2 gap-4">
        <WeatherDetail
          icon={<Droplets className="text-blue-300 w-5 h-5" />}
          label="Humedad"
          value={`${weather.main.humidity}%`}
        />
        <WeatherDetail
          icon={<Wind className="text-slate-300 w-5 h-5" />}
          label="Viento"
          value={`${weather.wind.speed} m/s`}
        />
        <WeatherDetail
          icon={<Sun className="text-yellow-300 w-5 h-5" />}
          label="Máxima"
          value={`${Math.round(weather.main.temp_max)}°`}
        />
        <WeatherDetail
          icon={<Thermometer className="text-red-300 w-5 h-5" />}
          label="Mínima"
          value={`${Math.round(weather.main.temp_min)}°`}
        />
      </div>
    </div>
  )
}
