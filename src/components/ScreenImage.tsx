import { SHOT, shotSrcSet, shotUrl, type Screenshot, type ScreenshotSet } from '../data/app'

interface Props {
  set: ScreenshotSet
  shot: Screenshot
  sizes: string
  /** Above-the-fold images load straight away; everything else is lazy. */
  priority?: boolean
  eager?: boolean
}

/** One responsive screenshot. Width and height are the real file size so the layout never shifts. */
export function ScreenImage({ set, shot, sizes, priority = false, eager = false }: Props) {
  return (
    <img
      src={shotUrl(set, shot.n, 540)}
      srcSet={shotSrcSet(set, shot.n)}
      sizes={sizes}
      width={SHOT.width}
      height={SHOT.height}
      alt={shot.alt}
      decoding="async"
      loading={priority || eager ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
