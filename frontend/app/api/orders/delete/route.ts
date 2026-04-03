import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
const body = await req.json()

const { data, error } = await supabase
.from("orders")
.delete()
.eq("id", String(body.id))
.select()

console.log("SİLİNEN:", data)

return Response.json({ success: true })
}

