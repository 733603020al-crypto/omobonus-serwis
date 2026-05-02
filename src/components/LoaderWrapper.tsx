'use client'

import { useEffect, useState } from 'react'
import Loader from './Loader'

export default function LoaderWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const [showLoader, setShowLoader] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false)
        }, 8000)

        return () => clearTimeout(timer)
    }, [])

    if (showLoader) {
        return <Loader />
    }

    return <>{children}</>
}