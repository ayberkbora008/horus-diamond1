export async function POST(req: Request) {
const { code, realCode } = await req.json()

if (code === realCode) {
return Response.json({ success: true })
}

return Response.json({ success: false })
}

