interface WeatherDetailProps {
  icon: React.ReactNode
  label: string
  value: string
}

const WeatherDetail = ({ icon, label, value }: WeatherDetailProps) => {
  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-black/30 transition-colors">
      <div className="flex items-center gap-2 mb-1 opacity-70">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">
          {label}
        </span>
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  )
}

export default WeatherDetail
