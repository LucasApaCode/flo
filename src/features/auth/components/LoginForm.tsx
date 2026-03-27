'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setError('root', { message: 'Correo electrónico o contraseña incorrectos' })
      return
    }

    router.push('/dashboard')
  }

  const handleGoogleSignIn = () => {
    signIn('google', { redirectTo: '/dashboard' })
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_32px_64px_-16px_rgba(17,28,45,0.08)] p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface font-headline">
          Bienvenido
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">Inicia sesión en tu cuenta de Flo</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-outline-variant" />
        <span className="text-xs uppercase tracking-widest text-on-surface-variant/60">
          o continuá con
        </span>
        <div className="flex-1 h-px bg-outline-variant" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="bg-surface-container-low rounded-xl py-3.5 w-full flex items-center justify-center gap-3 hover:bg-surface-container-high transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M12 5.04c1.94 0 3.51.67 4.71 1.74l3.53-3.53C17.9 1.24 15.21 0 12 0 7.31 0 3.28 2.67 1.23 6.64l4.13 3.21C6.35 6.94 8.94 5.04 12 5.04z" fill="#EA4335" />
          <path d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.3h6.44c-.28 1.48-1.11 2.73-2.37 3.58l3.68 2.85c2.14-1.98 3.39-4.89 3.39-8.46z" fill="#4285F4" />
          <path d="M5.36 14.35c-.24-.72-.37-1.49-.37-2.35s.13-1.63.37-2.35L1.23 6.64C.45 8.24 0 10.07 0 12c0 1.93.45 3.76 1.23 5.36l4.13-3.21z" fill="#FBBC05" />
          <path d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.68-2.85c-1.11.75-2.52 1.19-4.26 1.19-3.06 0-5.65-2.06-6.58-4.84l-4.13 3.21C3.28 21.33 7.31 24 12 24z" fill="#34A853" />
        </svg>
        <span className="text-sm font-semibold text-on-surface">Continuar con Google</span>
      </button>

      <p className="text-center text-sm text-on-surface-variant">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Crear una cuenta
        </Link>
      </p>
    </div>
  )
}
