import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { error } = await supabase.from('orders').update({ 
      status: "approved", 
      admin: body.admin,
      data: new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }) 
    }).eq('id', body.id)
    if (error) throw error
    return Response.json({ success: true })
  } catch (err: any) { return Response.json({ error: err.message }, { status: 500 }) }
}