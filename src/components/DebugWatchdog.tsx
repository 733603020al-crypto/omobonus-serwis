'use client'

import { useEffect } from 'react'

export function DebugWatchdog({ targetIds }: { targetIds: string[] }) {
    useEffect(() => {
        if (typeof window === 'undefined') return

        console.log(`[DebugWatchdog] 🛡️ Started watching: ${targetIds.join(', ')}`)

        // 1. Intercept native DOM removal methods
        const originalRemoveChild = Node.prototype.removeChild
        const originalReplaceChild = Node.prototype.replaceChild
        const originalRemove = Element.prototype.remove

        const isTarget = (node: Node | null) => {
            if (!node || !(node instanceof Element)) return false
            return targetIds.includes(node.id) || targetIds.some(id => node.querySelector?.(`#${id}`))
        }

        // Hook removeChild
        Node.prototype.removeChild = function <T extends Node>(child: T): T {
            if (isTarget(child)) {
                console.error(`[DebugWatchdog] 🧨 BLOCKED removeChild attempt on #${(child as unknown as Element).id || 'target'}`)
                console.trace('Who tried to remove it?')
                // Returning the child without removing it effectively blocks the removal!
                // Uncomment the next line to ALLOW removal but log it
                // return originalRemoveChild.call(this, child) as T
                return child
            }
            return originalRemoveChild.call(this, child) as T
        }

        // Hook replaceChild
        Node.prototype.replaceChild = function <T extends Node>(node: Node, child: T): T {
            if (isTarget(child)) {
                console.error(`[DebugWatchdog] 🧨 BLOCKED replaceChild attempt on #${(child as unknown as Element).id || 'target'}`)
                console.trace('Who tried to replace it?')
                return child
            }
            return originalReplaceChild.call(this, node, child) as T
        }

        // Hook .remove()
        Element.prototype.remove = function () {
            if (isTarget(this)) {
                console.error(`[DebugWatchdog] 🧨 BLOCKED .remove() attempt on #${this.id}`)
                console.trace('Who tried to remove it?')
                return
            }
            return originalRemove.call(this)
        }

        // 2. MutationObserver as backup for innerHTML changes
        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                if (m.type === 'childList') {
                    m.removedNodes.forEach(node => {
                        if (isTarget(node)) {
                            console.error(`[DebugWatchdog] 💀 MutationObserver saw removal of #${(node as Element).id} via parent innerHTML/clobber! Parent:`, m.target)
                        }
                    })
                }
            }
        })

        observer.observe(document.documentElement, { childList: true, subtree: true })

        return () => {
            // Cleanup (optional, but good for HMR)
            Node.prototype.removeChild = originalRemoveChild
            Node.prototype.replaceChild = originalReplaceChild
            Element.prototype.remove = originalRemove
            observer.disconnect()
        }
    }, [targetIds])

    return null
}
