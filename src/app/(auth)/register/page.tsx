import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { Wallet } from 'lucide-react'

export const metadata = {
  title: 'Crear cuenta — Flo',
}

export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col items-center mb-10">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tighter text-on-background font-headline">
          Flo
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">Finanzas personales</p>
      </div>
      <RegisterForm />
    </>
  )
}
