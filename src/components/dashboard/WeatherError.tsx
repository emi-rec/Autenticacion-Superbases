import { Button } from '../ui'

export const WeatherError = ({ onRetry }: { onRetry: () => void }) => (
  <div className="text-center py-12">
    <p className="text-white/80 mb-4 text-lg">No encontramos esa ubicación.</p>
    <Button variant="secondary" onClick={onRetry}>
      Volver a Madrid
    </Button>
  </div>
)
