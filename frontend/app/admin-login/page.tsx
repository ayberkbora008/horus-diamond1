"use client"

import { useState } from "react"

export default function AdminLogin() {
const [email, setEmail] = useState("")
const [code, setCode] = useState("")
const [realCode, setRealCode] = useState("")
const [step, setStep] = useState(1)

const sendCode = async () => {
const res = await fetch("/api/send-code", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ email }),
})

const data = await res.json()

if (!res.ok) {
alert(data.error) // ❗ BURASI ÖNEMLİ
return
}

setRealCode(data.code)
setStep(2)
}


const verifyCode = async () => {
const res = await fetch("/api/verify-code", {
method: "POST",
body: JSON.stringify({ code, realCode }),
})

const data = await res.json()

if (data.success) {
localStorage.setItem("admin", "true")
localStorage.setItem("adminName", email.split("@")[0])
window.location.href = "/admin"
} else {
alert("Kod yanlış")
}
}

return (
<div className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">

{/* ARKA PLAN */}
<div className="absolute w-full h-full bg-gradient-to-br from-[#020617] via-[#020617] to-black"></div>

{/* IŞIK EFEKTİ */}
<div className="absolute w-[500px] h-[500px] bg-cyan-500 blur-[180px] opacity-20 rounded-full"></div>

{/* LOGO */}
<img
src="/horus2.png"
className="w-24 mb-6 drop-shadow-[0_0_25px_#00ffff] z-10"
/>

{/* BAŞLIK */}
<h1 className="text-3xl mb-6 text-cyan-400 z-10 animate-pulse">
HORUS ADMIN PANEL
</h1>

{/* FORM */}

<div className="z-10 flex flex-col items-center gap-4 bg-black/40 p-6 rounded-xl border border-cyan-400 shadow-[0_0_25px_#00ffff]">

{step === 1 && (
<>
<input
placeholder="Email"
onChange={(e) => setEmail(e.target.value)}
className="p-3 w-64 rounded bg-black border border-cyan-400 text-white outline-none shadow-[0_0_10px_#00ffff]"
/>

<button
onClick={sendCode}
className="px-6 py-2 rounded bg-cyan-500 text-black font-bold shadow-[0_0_20px_#00ffff] hover:scale-110 transition"
>
Kod Gönder
</button>
</>
)}

<a
href="/"
className="text-cyan-400 text-sm mt-2 hover:underline"
>
Ana Sayfaya Dön
</a>

{step === 2 && (
<>
<input
placeholder="Kod"
onChange={(e) => setCode(e.target.value)}
className="p-3 w-64 rounded bg-black border border-green-400 text-white shadow-[0_0_10px_#00ff88]"
/>

<button
onClick={verifyCode}
className="px-6 py-2 rounded bg-green-500 text-black font-bold shadow-[0_0_20px_#00ff88] hover:scale-110 transition"
>
Giris Yap
</button>
</>
)}

</div>
</div>
)
}