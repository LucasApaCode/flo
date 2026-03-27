'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Receipt, LogOut, Wallet, BarChart2 } from 'lucide-react'
import { signOut } from 'next-auth/react'

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transacciones', icon: Receipt },
  { href: '/stats', label: 'Estadísticas', icon: BarChart2 },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 z-50 bg-sidebar shadow-xl shadow-slate-900/5 flex-col p-6 gap-8">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-primary font-headline">Flo</h1>
          <p className="text-xs text-on-surface-variant font-medium">Finanzas personales</p>
        </div>
      </div>
      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-grow">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={
                active
                  ? 'flex items-center gap-3 px-4 py-3 text-primary bg-card rounded-lg shadow-sm font-bold transition-all'
                  : 'flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200 font-medium'
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
      {/* Footer */}
      <div className="pt-6 border-t border-outline-variant/30 flex flex-col gap-1">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
