import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-xl font-semibold text-on-surface">Página no encontrada</h2>
      <Link
        href="/dashboard"
        className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
