import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { error } = await supabase.from('orders').insert([{
        id: `man_${Date.now()}`,
        bigo_id: body.bigo_id,
        amount: Number(body.amount),
        admin: body.admin,
        status: "approved", 
        payment: 'manuel',
        data: new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })
      }])
    if (error) throw error
    return Response.json({ success: true })
  } catch (err: any) { return Response.json({ error: err.message }, { status: 500 }) }
}