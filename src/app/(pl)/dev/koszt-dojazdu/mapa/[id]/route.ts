import { notFound } from 'next/navigation'
import { kosztStore } from '../../store'

// Map picture of a calculated route (dev only), so the large image does not travel inside the page data.
export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (process.env.NODE_ENV === 'production') notFound()
  const src = kosztStore().get((await params).id)?.map.src
  if (!src) return new Response('not found', { status: 404 })
  return new Response(Buffer.from(src.slice(src.indexOf(',') + 1), 'base64'), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' } })
}
