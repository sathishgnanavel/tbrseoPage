import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = { viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false } as const

export const AppleIcon = (p: P) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
)

export const PlayIcon = (p: P) => (
  <svg {...base} {...p}>
    <path fill="#00A0FF" d="M3.6 1.5 13.4 12 3.6 22.5c-.4-.3-.6-.8-.6-1.4V2.9c0-.6.2-1.1.6-1.4z" />
    <path fill="#00E26A" d="M13.4 12 3.6 1.5c.5-.2 1.2-.1 1.7.2l11.4 6.8z" />
    <path fill="#FF3A44" d="m13.4 12 3.3 3.5-11.4 6.6c-.5.3-1.2.4-1.7.2z" />
    <path fill="#FFC800" d="m16.7 8.5 4.3 2.5c.8.5.8 1.5 0 2l-4.3 2.5L13.4 12z" />
  </svg>
)

export const StarIcon = (p: P) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
  </svg>
)

export const CheckIcon = (p: P) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

export const CloseIcon = (p: P) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const ChevronIcon = (p: P) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const MenuIcon = (p: P) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const PinIcon = (p: P) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
)

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="2.5" width="10" height="19" rx="2.6" />
    <path d="M10.6 5.2h2.8" />
  </svg>
)

export const TabletIcon = (p: P) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4.5" y="2.5" width="15" height="19" rx="2.4" />
    <path d="M10.5 18.6h3" />
  </svg>
)

export function StarRow({ value }: { value: number }) {
  return (
    <span className="stars" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} className={n <= Math.round(value) ? 'on' : 'off'} />
      ))}
    </span>
  )
}
