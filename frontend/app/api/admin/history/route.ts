let history: any[] = []

export async function GET() {
return Response.json(history)
}

export async function POST(req: Request) {
const data = await req.json()
history.push(data)
return Response.json({ ok: true })
}

