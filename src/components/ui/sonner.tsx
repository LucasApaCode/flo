"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-600" />,
        info:    <InfoIcon className="size-4 text-[#4648d4]" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-500" />,
        error:   <OctagonXIcon className="size-4 text-[#a43a3a]" />,
        loading: <Loader2Icon className="size-4 animate-spin text-on-surface-variant" />,
      }}
      toastOptions={{
        classNames: {
          toast:       'font-sans !bg-white !text-[#111c2d] !border !border-[#bbcabf33] !rounded-xl !shadow-lg !shadow-[#111c2d08] !py-3.5 !px-4',
          title:       '!font-semibold !text-sm !text-[#111c2d]',
          description: '!text-xs !text-[#3c4a42]',
          success:     '!border-l-2 !border-l-emerald-500',
          error:       '!border-l-2 !border-l-[#a43a3a]',
          warning:     '!border-l-2 !border-l-amber-400',
          info:        '!border-l-2 !border-l-[#4648d4]',
          closeButton: '!bg-surface-container-low !border-[#bbcabf33] hover:!bg-surface-container',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
