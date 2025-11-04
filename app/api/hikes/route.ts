import { NextResponse } from 'next/server'
import { createHike, getHikes } from '@/lib/hikesService'
import type { Hike } from '@/types/hikes'

// ✅ GET /api/hikes
export async function GET() {
  try {
    const hikes = await getHikes()
    return NextResponse.json(hikes)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// ✅ POST /api/hikes
export async function POST(request: Request) {
  try {
    const body: Hike = await request.json()
    const newHike = await createHike(body)
    return NextResponse.json(newHike, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
