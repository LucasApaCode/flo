'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

const registerSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
      setError('root', {
        message: json.error?.message ?? 'Algo salió mal',
      })
      return
    }

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setError('root', { message: 'Cuenta creada, pero no pudimos iniciarte sesión. Intenta desde el inicio de sesión.' })
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_32px_64px_-16px_rgba(17,28,45,0.08)] p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface font-headline">
          Crear tu cuenta
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">Ingresa tus datos para empezar</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="text-on-surface-variant text-sm font-medium ml-1 block mb-2">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            className={`border-0 border-b-2 rounded-lg px-4 py-3 w-full outline-none transition-all text-on-surface placeholder:text-on-surface-variant/40 ${
              errors.name
                ? 'bg-red-50 border-red-400 focus:border-red-500'
                : 'bg-surface-container-low border-transparent focus:border-primary'
            }`}
            {...register('name')}
          />
          {errors.name && (
            <p className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-on-surface-variant text-sm font-medium ml-1 block mb-2">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@ejemplo.com"
            className={`border-0 border-b-2 rounded-lg px-4 py-3 w-full outline-none transition-all text-on-surface placeholder:text-on-surface-variant/40 ${
              errors.email
                ? 'bg-red-50 border-red-400 focus:border-red-500'
                : 'bg-surface-container-low border-transparent focus:border-primary'
            }`}
            {...register('email')}
          />
          {errors.email && (
            <p className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="text-on-surface-variant text-sm font-medium ml-1 block mb-2">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••"
              className={`border-0 border-b-2 rounded-lg px-4 py-3 pr-12 w-full outline-none transition-all text-on-surface placeholder:text-on-surface-variant/40 ${
                errors.password
                  ? 'bg-red-50 border-red-400 focus:border-red-500'
                  : 'bg-surface-container-low border-transparent focus:border-primary'
              }`}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant/50 hover:text-on-surface-variant transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {errors.password.message}
            </p>
          )}
        </div>

        {errors.root && (
          <div className="relative overflow-hidden flex items-start gap-3 p-4 rounded-xl border border-tertiary/20 bg-tertiary/5 shadow-sm shadow-tertiary/5">
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none bg-tertiary" />
            <div className="flex-shrink-0 p-1.5 rounded-lg bg-tertiary/10">
              <AlertCircle className="w-4 h-4 text-tertiary" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-tertiary/60">Error</p>
              <p className="text-sm font-medium text-tertiary mt-0.5">{errors.root.message}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all disabled:opacity-60"
        >
          {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </div>
  )
}
