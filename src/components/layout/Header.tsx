import { auth } from '@/features/auth/lib/auth.config'

export async function Header() {
  const session = await auth()
  return (
    <header className="fixed top-0 left-64 right-0 z-40 bg-background/80 backdrop-blur-xl flex justify-between items-center h-16 px-8 border-b border-outline-variant/20">
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-on-surface leading-none">
              {session?.user?.name ?? session?.user?.email}
            </p>
            <p className="text-[10px] text-on-surface-variant font-medium">Miembro</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            {(session?.user?.name ?? session?.user?.email ?? 'U')[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  )
}
