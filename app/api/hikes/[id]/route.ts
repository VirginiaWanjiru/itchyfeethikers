import { NextResponse } from 'next/server'
import { getHikeById, updateHike, deleteHike } from '@/lib/hikesService'
import type { Hike } from '@/types/hikes'

// ✅ GET /api/hikes/:id
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const hike = await getHikeById(params.id)
    return NextResponse.json(hike)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }
}

// ✅ PUT /api/hikes/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const updates: Partial<Hike> = await req.json()
    const updated = await updateHike(params.id, updates)
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// ✅ DELETE /api/hikes/:id
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await deleteHike(params.id)
    return NextResponse.json({ message: 'Hike deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
