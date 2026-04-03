"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([])
  const [adminName, setAdminName] = useState("")
  const [showWelcome, setShowWelcome] = useState(true)
  const [bigoId, setBigoId] = useState("")
  const [diamond, setDiamond] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const price = Math.round((diamond / 1000) * 880)

  async function getOrders() {
    try {
      const res = await fetch("/api/orders")
      const data = await res.json()
      setOrders(data || [])
    } catch (err) {
      console.error("Orders çekilirken hata:", err)
    }
  }

  // ONAY TUŞU
  async function handleApprove(id: string) {
    try {
      const res = await fetch("/api/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, admin: adminName }) 
      })
      if (res.ok) getOrders() 
      else { const err = await res.json(); alert(`Hata: ${err.error}`) }
    } catch (err) { console.error("Onaylama hatası:", err) }
  }

  // SİL TUŞU
  const handleDelete = async (id: string) => {
    if (!confirm("Silmek istediğine emin misin?")) return
    try {
      const res = await fetch("/api/orders/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
      if (res.ok) getOrders()
    } catch (err) { console.log("HATA:", err) }
  }

  // MANUEL YÜKLEME TUŞU
  async function handleLoad() {
    if (!bigoId || diamond <= 0) return alert("ID ve elmas gir")
    const uniqueId = `man_${Date.now()}`
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uniqueId,
          bigo_id: bigoId,
          amount: diamond,
          admin: adminName || "Admin"
        })
      })
      if (res.ok) {
        setConfirmOpen(false); setSuccessOpen(true); setBigoId(""); setDiamond(0); getOrders() 
        setTimeout(() => setSuccessOpen(false), 2000)
      } else {
        const err = await res.json(); alert(`Hata: ${err.error}`)
      }
    } catch (err) { alert("Bağlantı hatası!") }
  }

  function logout() {
    localStorage.removeItem("adminName")
    window.location.href = "/admin-login"
  }

  useEffect(() => {
    getOrders()
    setAdminName(localStorage.getItem("adminName") || "Admin")
    setTimeout(() => setShowWelcome(false), 2000)
    const interval = setInterval(getOrders, 3000)
    return () => clearInterval(interval)
  }, [])

  const pendingOrders = orders.filter(o => o.status === "pending")
  const approvedOrders = orders.filter(o => o.status === "approved")
  const customerOrders = approvedOrders.filter(o => o.payment === "havale")
  const adminManualOrders = approvedOrders.filter(o => o.payment === "manuel")
  const totalGain = approvedOrders.reduce((a, o) => a + (Number(o.amount) || 0), 0)

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden bg-black">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00ffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {showWelcome && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <h1 className="text-3xl md:text-5xl text-yellow-400 font-bold text-center animate-pulse">
            GIRIS BASARILI ✅ <br />
            <span className="text-cyan-400">{adminName}</span>
          </h1>
        </div>
      )}

      <div className="relative z-10 p-4 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl bg-yellow-400 opacity-60 animate-pulse"></div>
              <Image src="/horus2.png" width={65} height={65} alt="logo" className="relative rounded-full border-2 border-yellow-400 shadow-[0_0_30px_#facc15]" />
            </div>
            <h1 className="text-xl md:text-3xl text-yellow-400 font-bold tracking-widest drop-shadow-[0_0_15px_#facc15] uppercase">
              HORUS ADMIN PANEL
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-cyan-400">{adminName}</p>
              <p className="text-green-400 text-sm font-bold">● ONLINE</p>
            </div>
            <button onClick={logout} className="px-4 py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-500/20 uppercase font-bold text-xs">Çıkış</button>
          </div>
        </div>

        {/* STATS - Mobilde 1, PC'de 3 sütun */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Stat title="Toplam Siparis" value={orders.length} color="cyan" />
          <Stat title="Onaylanan" value={approvedOrders.length} color="green" />
          <Stat title="Kazanç" value={totalGain.toLocaleString() + " ₺"} color="yellow" />
        </div>

        <div className="p-4 md:p-6 rounded-xl border border-cyan-400/30 bg-black/50 shadow-[0_0_25px_rgba(0,255,255,0.2)] mb-10">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={orders.map((o, i) => ({ name: i, amount: o.amount }))}>
              <XAxis dataKey="name" stroke="#00ffff" />
              <YAxis stroke="#00ffff" />
              <Tooltip contentStyle={{backgroundColor: "#000", border: "1px solid #0ff"}} />
              <Line type="monotone" dataKey="amount" stroke="#00ffff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BÖLÜM 1: BEKLEYEN TALEPLER */}
        <h2 className="text-cyan-400 text-lg mb-4 font-bold uppercase tracking-wider">Bekleyen Talepler</h2>
        {pendingOrders.map((o: any) => (
          <div key={o.id} className="border border-cyan-400/30 rounded-lg p-4 mb-3 bg-black/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-cyan-300">🆔 Bigo ID: <b>{o.bigo_id || "YOK"}</b></span>
              <span className="text-white">💎 Elmas: <b>{o.amount || 0}</b></span>
              <span className="text-gray-300">💳 Ödeme: <b>{o.payment || "havale"}</b></span>
              <span className="text-gray-400 text-xs">📅 Talep: {o.data}</span>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => handleApprove(o.id)} className="flex-1 md:flex-none bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded font-bold transition text-sm">✔ ONAYLA</button>
              <button onClick={() => handleDelete(o.id)} className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition font-bold text-sm">SIL</button>
            </div>
          </div>
        ))}

        {/* BÖLÜM 2: MÜŞTERİ SİPARİŞ GEÇMİŞİ */}
        {customerOrders.length > 0 && (
          <div className="mt-10 mb-10">
            <h2 className="text-green-400 text-xl mb-6 text-center tracking-widest font-bold uppercase drop-shadow-[0_0_10px_#22c55e]">MÜSTERI SIPARIS GECMISI</h2>
            <div className="flex flex-col gap-3">
              {customerOrders.sort((a, b) => b.id - a.id).map((item, i) => (
                <div key={item.id || i} className="flex flex-col md:flex-row justify-between md:items-center border border-green-500/30 p-4 rounded-lg bg-black/40 group transition-all hover:border-green-400/50 gap-2">
                  <div className="grid grid-cols-2 md:flex md:items-center gap-4 w-full">
                    <span className="text-green-400 font-bold">🆔 {item.bigo_id}</span>
                    <span className="text-white font-bold">💎 {Number(item.amount).toLocaleString()}</span>
                    <span className="text-cyan-400 font-semibold text-sm">👮 {item.admin}</span>
                    <span className="text-gray-400 text-[10px] md:text-sm">{item.data}</span>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500/20 text-red-500 px-4 py-1 rounded text-xs md:opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white font-bold w-full md:w-auto mt-2 md:mt-0">Sil</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YÜKLEME PANELİ */}
        <div className="flex justify-center mt-20">
          <div className="w-full max-w-[380px] bg-black/60 border border-yellow-400/40 p-6 rounded-2xl shadow-[0_0_30px_rgba(250,204,21,0.3)]">
            <h2 className="text-yellow-400 text-lg mb-4 text-center font-bold uppercase">Elmas Yükleme Paneli</h2>
            <input value={bigoId} onChange={(e) => setBigoId(e.target.value)} placeholder="Bigo ID" className="w-full mb-4 p-3 rounded-lg bg-black border border-yellow-400/30 text-white text-center outline-none font-bold" />
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[500, 1000, 2000, 5000, 10000].map((val) => (
                <button key={val} onClick={() => setDiamond(val)} className={`border rounded-lg py-2 text-xs font-bold transition ${diamond === val ? "bg-yellow-400 text-black shadow-[0_0_10px_#facc15]" : "border-yellow-400/40 text-yellow-300 hover:bg-yellow-400/10"}`}>{val.toLocaleString()}</button>
              ))}
            </div>
            <input type="number" placeholder="Farklı miktar" onChange={(e) => setDiamond(Number(e.target.value))} className="w-full mb-3 p-3 rounded bg-black border border-yellow-400/30 text-white text-center outline-none font-bold" />
            <div className="text-center text-gray-300 mb-4 font-bold">Ödenecek: <span className="text-yellow-400">{price} ₺</span></div>
            <button onClick={() => setConfirmOpen(true)} className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:scale-105 transition shadow-[0_0_15px_#facc15]">Yüklemeyi Onayla</button>
          </div>
        </div>

        {/* ONAY MODAL */}
        {confirmOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur flex items-center justify-center z-50 p-6">
            <div className="bg-black border border-yellow-400/60 p-8 rounded-2xl text-center w-full max-w-[320px] shadow-[0_0_40px_rgba(250,204,21,0.5)]">
              <h2 className="text-yellow-400 text-xl mb-4 font-bold uppercase">Yüklemeyi Onayla</h2>
              <div className="space-y-1 mb-6 text-sm">
                 <p className="text-gray-300">ID: <span className="text-white font-bold">{bigoId}</span></p>
                 <p className="text-gray-300">Miktar: <span className="text-white font-bold">{diamond.toLocaleString()} 💎</span></p>
              </div>
              <button onClick={handleLoad} className="w-full bg-yellow-400 text-black py-3 rounded-lg mb-3 font-bold hover:bg-yellow-300 transition uppercase shadow-[0_0_15px_#facc15]">Evet, Gönder</button>
              <button onClick={() => setConfirmOpen(false)} className="text-gray-400 text-sm font-bold hover:text-white transition uppercase">İptal</button>
            </div>
          </div>
        )}

        {successOpen && (
          <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
            <div className="text-center animate-pulse">
              <h1 className="text-3xl md:text-5xl text-yellow-400 mb-4 font-bold tracking-widest uppercase shadow-yellow-400">✔ Yükleme Başarılı</h1>
              <p className="text-gray-300 font-bold uppercase text-xs">{bigoId} Hesabına Aktarıldı</p>
            </div>
          </div>
        )}

        {/* BÖLÜM 3: ADMIN MANUEL YÜKLEMELER */}
        <div className="mt-24 w-full">
          <h2 className="text-yellow-400 text-xl mb-6 text-center tracking-widest font-bold uppercase drop-shadow-[0_0_10px_#facc15]">SON ONAYLANAN YÜKLEMELER (ADMIN)</h2>
          <div className="flex flex-col gap-3">
            {adminManualOrders.sort((a, b) => b.id - a.id).map((item, i) => (
              <div key={item.id || i} className="flex flex-col md:flex-row justify-between md:items-center border border-yellow-400/20 p-4 rounded-lg bg-black/40 group transition-all hover:border-yellow-400/50 gap-2">
                <div className="grid grid-cols-2 md:flex md:items-center gap-4 w-full">
                  <span className="text-yellow-400 font-bold">🆔 {item.bigo_id}</span>
                  <span className="text-white font-bold">💎 {Number(item.amount).toLocaleString()}</span>
                  <span className="text-cyan-400 font-semibold text-sm">👮 {item.admin}</span>
                  <span className="text-gray-400 text-[10px] md:text-sm">{item.data}</span>
                </div>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500/10 text-red-500 px-4 py-1 rounded text-xs md:opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white font-bold w-full md:w-auto mt-2 md:mt-0">Sil</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ title, value, color }: any) {
  const colors: any = {
    cyan: "border-cyan-400 text-cyan-400 shadow-[0_0_15px_#00ffff44]",
    green: "border-green-400 text-green-400 shadow-[0_0_15px_#22c55e44]",
    yellow: "border-yellow-400 text-yellow-400 shadow-[0_0_15px_#facc1544]"
  }
  return (
    <div className={`p-6 rounded-xl border-2 bg-black/80 flex flex-col items-center justify-center text-center ${colors[color]}`}>
      <p className="text-[10px] opacity-70 uppercase font-black tracking-widest mb-1">{title}</p>
      <h2 className="text-2xl font-black">{value}</h2>
    </div>
  )
}