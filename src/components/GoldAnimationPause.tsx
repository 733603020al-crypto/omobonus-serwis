'use client'

import { useEffect } from 'react'

// The gold CTA ring (.gold-border-flow::before, animated @property angle under a
// mask) and the label glint (.gold-text-sweep, animated background-position)
// can't run on the compositor: every frame is a style recalc + repaint on the
// main thread — even off-screen and inside content-visibility:auto (footer CTA).
// On a 4x-throttled phone that was ~1/3 of the main thread for the whole visit.
// Pause them while off-screen; on screen they run exactly as before.
const SEL = '.gold-border-flow, .gold-text-sweep'

export function GoldAnimationPause() {
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) e.target.toggleAttribute('data-anim-off', !e.isIntersecting)
        }, { rootMargin: '100px 0px' })
        const seen = new WeakSet<Element>()
        const scan = (root: ParentNode) => {
            const add = (el: Element) => { if (!seen.has(el)) { seen.add(el); io.observe(el) } }
            if (root instanceof Element && root.matches(SEL)) add(root)
            root.querySelectorAll(SEL).forEach(add)
        }
        scan(document)
        // Pages, menus and lazily rendered blocks mount later: pick up their buttons too.
        let pending: Node[] = []
        let raf = 0
        const mo = new MutationObserver((records) => {
            for (const r of records) r.addedNodes.forEach((n) => { if (n.nodeType === 1) pending.push(n) })
            if (pending.length && !raf) raf = requestAnimationFrame(() => {
                raf = 0
                const nodes = pending; pending = []
                nodes.forEach((n) => { if (n.isConnected) scan(n as Element) })
            })
        })
        mo.observe(document.body, { childList: true, subtree: true })
        return () => { mo.disconnect(); io.disconnect(); cancelAnimationFrame(raf) }
    }, [])

    return null
}
