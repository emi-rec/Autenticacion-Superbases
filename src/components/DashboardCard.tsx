import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components'

interface DashboardCardProps {
  userEmail?: string
}

const DashboardCard = ({ userEmail = 'Usuario' }: DashboardCardProps) => {
  return (
    <Card className="w-full max-w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>Bienvenido</CardTitle>
        <CardDescription className="font-medium text-primary">
          {userEmail}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Si ves esto con bordes redondeados y tipografía limpia, Shadcn y
          Tailwind están al 100%.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          Configurar Perfil
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DashboardCard
