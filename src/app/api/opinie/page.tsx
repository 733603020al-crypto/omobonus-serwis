'use client'

import { useEffect, useState } from 'react'

type Review = {
    author_name: string
    rating: number
    text: string
    relative_time_description: string
}

function Stars({ value }: { value: number }) {
    const full = Math.round(value)
    return (
        <span className="text-yellow-500">
            {'★'.repeat(full)}
            {'☆'.repeat(5 - full)}
        </span>
    )
}

export default function OpiniePage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [rating, setRating] = useState<number | null>(null)
    const [reviews, setReviews] = useState<Review[]>([])

    useEffect(() => {
        fetch('/api/google-reviews')
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setRating(data.rating)
                    setReviews(data.reviews || [])
                }
            })
            .catch(() => {
                setError('Nie udało się załadować opinii')
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div className="p-4">Ładowanie opinii…</div>
    }

    if (error) {
        return <div className="p-4 text-red-600">Błąd: {error}</div>
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-2">
                Opinie klientów z Google
            </h1>

            {rating && (
                <div className="flex items-center gap-2 mb-4">
                    <Stars value={rating} />
                    <span className="text-sm text-gray-600">
                        {rating.toFixed(1)} / 5
                    </span>
                </div>
            )}

            <div className="grid gap-3">
                {reviews.map((r, index) => (
                    <div
                        key={index}
                        className="border rounded-md p-3 bg-white shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <strong className="text-sm">{r.author_name}</strong>
                            <Stars value={r.rating} />
                        </div>

                        <p className="text-sm leading-snug mb-1">
                            {r.text}
                        </p>

                        <div className="text-xs text-gray-500">
                            {r.relative_time_description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

