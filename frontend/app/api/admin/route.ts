let orders: any[] = []
let history: any[] = []

export async function GET() {
return Response.json(orders)
}

export async function POST(req: Request) {
const body = await req.json()

const newOrder = {
id: Date.now().toString(),
username: body.username,
amount: body.amount,
payment: body.payment,
status: "pending"
}

orders.push(newOrder)

return Response.json({ success: true })
}

export async function PUT(req: Request) {
const body = await req.json()

const order = orders.find(o => o.id === body.id)

if (order) {
order.status = "approved"
history.push(order)
orders = orders.filter(o => o.id !== body.id)
}

return Response.json({ success: true })
}

export async function DELETE() {
return Response.json(history)
}