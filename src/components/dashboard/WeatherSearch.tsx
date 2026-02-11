import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface WeatherSearchProps {
  onSearch: (city: string) => void
  loading?: boolean
}

export function WeatherSearch({ onSearch, loading }: WeatherSearchProps) {
  const [searchCity, setSearchCity] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (searchCity.trim()) {
      onSearch(searchCity.trim())
      setSearchCity('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full md:w-80 items-center space-x-2"
    >
      <Input
        placeholder="Buscar clima de otra ciudad..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        className="bg-white shadow-sm"
      />
      <Button type="submit" size="icon" disabled={loading}>
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}
