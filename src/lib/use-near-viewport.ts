'use client'

import { useEffect, useState, type RefObject } from 'react'

// True once the element comes within `margin` of the viewport (then stays true).
// Used to hold back CSS background images of below-the-fold blocks until the
// user scrolls towards them (1.5 screens ahead) — wide enough that a fast scroll
// still finds them loaded.
export function useNearViewport(ref: RefObject<Element | null>, margin = '150%') {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: `${margin} 0px ${margin} 0px` }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, margin, near])

  return near
}
