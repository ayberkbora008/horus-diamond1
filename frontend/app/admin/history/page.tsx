"use client"

import { useEffect, useState } from "react"

export default function History() {
const [orders, setOrders] = useState<any[]>([])
const [search, setSearch] = useState("")

async function getOrders() {
const res = await fetch("/api/orders")
const data = await res.json()

// ✅ SADECE ONAYLANANLAR
const approved = data.filter((o: any) => o.status === "approved")

setOrders(approved)
}

useEffect(() => {
getOrders()
}, [])

// 🔍 SEARCH FILTER
const filtered = orders.filter((o) =>
o.username.toLowerCase().includes(search.toLowerCase())
)

return (
<div className="min-h-screen bg-black text-white p-10">
<div className="flex justify-between items-center mb-8">

<h1 className="px-5 py-2
bg-gradient-to-r from-cyan-500 to-blue-500
rounded-lg
font-bold
hover:scale-105
transition
shadow-[0_0_20px_cyan]">
Gecmis Siparisler
</h1>

<button
onClick={() => {
sessionStorage.setItem("skipWelcome", "true")
window.location.href = "/admin"
}}
className="
px-5 py-2
bg-cyan-500
rounded-lg
font-bold
hover:bg-cyan-400
transition
shadow-[0_0_15px_cyan]
"
>
← Geri
</button>

</div>

<h1 className="text-3xl mb-6 text-purple-400">
</h1>

{/* SEARCH */}
<input
placeholder="Kullanıcı ara..."
className="mb-6 p-2 rounded bg-black border border-purple-400 w-full"
value={search}
onChange={(e) => setSearch(e.target.value)}
/>

{/* LIST */}
<div className="space-y-4">
{filtered.map((o) => (
<div
key={o.id}
className="p-4 rounded-xl border border-purple-400"
>
👤 {o.username} - 💎 {o.amount} - 💳 {o.payment}
</div>
))}
</div>
</div>
)
}