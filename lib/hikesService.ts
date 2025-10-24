import { supabase } from './supabaseClient'
import { Hike } from'@/types/hikes' 

// ✅ CREATE
export async function createHike(hikeData: Omit< Hike, 'id' | 'created_at'>): Promise<Hike> {
  const { data, error } = await supabase.from('hikes').insert([hikeData]).select().single()
  if (error) throw new Error(error.message)
  return data
}

// ✅ READ (All)
export async function getHikes(): Promise<Hike[]> {
  const { data, error } = await supabase.from('hikes').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

// ✅ READ (One)
export async function getHikeById(id: string): Promise<Hike | null> {
  const { data, error } = await supabase.from('hikes').select('*').eq('id', id).single()
  if (error) throw new Error(error.message)
  return data
}

// ✅ UPDATE
export async function updateHike(id: string, updates: Partial<Hike>): Promise<Hike> {
  const { data, error } = await supabase.from('hikes').update(updates).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data
}

// ✅ DELETE
export async function deleteHike(id: string): Promise<{ success: boolean }> {
  const { error } = await supabase.from('hikes').delete().eq('id', id)
  if (error) throw new Error(error.message)
  return { success: true }
}
