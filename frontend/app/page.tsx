"use client"

import { useState } from "react"
import Link from "next/link";


import { useEffect } from "react"


async function createOrder(bigoId: string, diamond: number) {
const res = await fetch("/api/orders", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
bigo_id: bigoId,
amount: diamond,
payment: "havale"
})
})

const data = await res.json()
console.log(data)
}


export default function Home(){
    

const [diamondAmount,setDiamondAmount] = useState(0)
const [copied,setCopied] = useState("")

const iban = "TR70 0001 0001 6498 1646 7650 01"
const name = "DEP E-TICARET PAZARLAMA LIMITED SIRKETI"

const [bigoId,setBigoId] = useState("")
const [menuOpen,setMenuOpen] = useState(false)
const [orderOpen,setOrderOpen] = useState(false)
const [paymentOpen,setPaymentOpen] = useState(false)

useEffect(() => {
if (paymentOpen) {
document.body.style.overflow = "hidden"
} else {
document.body.style.overflow = "auto"
}

return () => {
document.body.style.overflow = "auto"
}
}, [paymentOpen])

const [successOpen,setSuccessOpen] = useState(false)
const [bigoStep, setBigoStep] = useState(false)
const [whatsappOpen, setWhatsappOpen] = useState(false)
const [paymentMethod,setPaymentMethod] = useState("havale")
const [selectedPackage,setSelectedPackage] = useState<any>(null)
const [paymentStep,setPaymentStep] = useState(false)
const packages = [

{amount:500,price:"440₺"},
{amount:1000,price:"880₺"},
{amount:3000,price:"2.640₺"},
{amount:5000,price:"4.400₺"},
{amount:10000,price:"8.800₺"},
{amount:30000,price:"26.400₺"}
]
const calculated = Math.round((diamondAmount / 1000) * 865)

const selectedPrice =
packages.find(p => p.amount === diamondAmount)?.price ||
`${calculated.toLocaleString()}₺`

const [ibanStep,setIbanStep] = useState(false)

return (
    
<div
className="min-h-screen text-white relative overflow-hidden"



style={{
backgroundColor: "#020617",
backgroundImage: `
radial-gradient(#00ffff22 1px, transparent 1px),
linear-gradient(to bottom right, #020617, #030712, #000000)
`,
backgroundSize: "40px 40px, 100% 100%",
}}
>

{/* HERO */}

<section className="max-w-4xl mx-auto text-center pt-24">

<div className="flex justify-center">
<div className="relative animate-float">
<img
src="/horus2.png"
className="mx-auto w-32 rounded-full p-[3px]
bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
shadow-[0_0_50px_#facc15]"
/>

{/* glow halka */}
<div className="absolute inset-0 rounded-full border border-yellow-400 opacity-40 blur-md"></div>
</div>
</div>


<h1 className="text-center text-5xl font-bold mt-6 text-yellow-400 animate-glow tracking-wider">
BigoLive Elmas Yükleme
</h1>

<p className="text-center text-gray-300 mt-2 tracking-wide
drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
Türkiye'nin en hızlı Bigolive elmas satıs sitesi
</p>

</section>



{/* TRUST SECTION */}

<section className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 text-center px-4">

{/* ⚡ Anında Teslimat */}
<div className="
border border-yellow-400/40 rounded-2xl p-6
bg-black/40 backdrop-blur
shadow-[0_0_20px_rgba(255,215,0,0.2)]
hover:shadow-[0_0_40px_rgba(255,215,0,0.6)]
transition
">
<h3 className="text-xl text-yellow-400 font-bold mb-2 drop-shadow-[0_0_8px_#FFD700]">
⚡ Anında Teslimat
</h3>

<p className="text-gray-300 text-sm">
Siparişiniz saniyeler içinde hesabınıza yüklenir.
</p>
</div>

{/* 🔒 Güvenli Hizmet */}
<div className="
border border-yellow-400/40 rounded-2xl p-6
bg-black/40 backdrop-blur
shadow-[0_0_20px_rgba(255,215,0,0.2)]
hover:shadow-[0_0_40px_rgba(255,215,0,0.6)]
transition
">
<h3 className="text-xl text-yellow-400 font-bold mb-2 drop-shadow-[0_0_8px_#FFD700]">
🔒 Güvenli Hizmet
</h3>

<p className="text-gray-300 text-sm">
Tüm işlemler güvenli şekilde gerçekleştirilir.
</p>
</div>

{/* 🛠 YARDIM */}
<Link href="/contact">
<div className="
cursor-pointer
border border-yellow-400 rounded-2xl p-6
bg-black/60 backdrop-blur
text-yellow-400 font-bold
shadow-[0_0_25px_rgba(255,215,0,0.6)]
hover:shadow-[0_0_50px_rgba(255,215,0,1)]
hover:scale-105
transition
">
🛠 YARDIM
</div>
</Link>

{/* ⚙️ ADMIN */}
<Link href="/admin-login">
<div className="
cursor-pointer
border border-cyan-400 rounded-2xl p-6
bg-black/60 backdrop-blur
text-cyan-400 font-bold
shadow-[0_0_25px_rgba(34,211,238,0.6)]
hover:shadow-[0_0_50px_rgba(34,211,238,1)]
hover:scale-105
transition
">
⚙️ ADMIN GİRİŞ
</div>
</Link>

</section>



{/* ELMA PAKETLERİ */}

<section className="max-w-6xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 px-4">

{packages.map((pkg,i)=>(

<div
key={i}
className="
relative
bg-[#0b1220]/70
rounded-2xl
p-6
flex flex-col items-center
overflow-hidden
transition-all duration-300
hover:scale-[1.03]
z-10
"
>


{/* neon border */}
<div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)] z-0"></div>

<div className="relative mb-4">

<img
src="/bigoelmas.png"
className="
w-16
relative z-10
drop-shadow-[0_0_10px_#FFD700]
animate-pulse
"
/>

{/* glow layer */}
<div className="
absolute inset-0
bg-yellow-400
opacity-20
blur-xl
rounded-full
animate-pulse
"></div>

</div>

<h3 className="
text-xl mb-2
text-yellow-400 font-bold text-center whitespace-nowrap
">
{pkg.amount.toLocaleString("tr-TR")} Elmas
</h3>

<p className="text-gray-500 text-sm">
Anında yükleme
</p>

<div className="
px-4 py-1 mt-1 mb-4
border border-yellow-400
rounded
text-yellow-400
shadow-[0_0_10px_rgba(255,215,0,0.6)]
">

{pkg.price}
</div>

<button
onClick={() => {
setDiamondAmount(pkg.amount)
setSelectedPackage(pkg)
setBigoStep(true)
}}
className="
bg-gradient-to-r from-yellow-400 to-yellow-600
text-black px-5 py-2 rounded-lg font-bold
shadow-[0_0_20px_rgba(255,215,0,0.7)]
hover:scale-110
hover:shadow-[0_0_40px_rgba(255,215,0,1)]
transition
"
>
Satın Al
</button>




</div>

))}

</section>



{/* DİĞER MİKTAR */}
<div className="absolute inset-0 rounded-2xl pointer-events-none border border-yellow-400/40 animate-borderGlow"></div>
<div className="flex justify-center mt-22 w-full">

<div className="
w-[380px]
bg-[#0b0b12]
border border-yellow-400/60
rounded-2xl
p-6
flex flex-col items-center
shadow-[0_0_15px_rgba(250,204,21,0.5)]
">

<h3 className="text-yellow-400 text-xl mb-4 font-semibold">
Diger Miktar
</h3>

<input
type="number"
placeholder="Kaç elmas almak istiyorsunuz?"
value={diamondAmount}
onChange={(e)=>setDiamondAmount(Number(e.target.value))}
className="w-full p-3 bg-black/40 border border-yellow-400/50 focus:border-yellow-300 focus:shadow-[0_0_10px_rgba(250,204,21,0.6)]"
/>

<input
type="text"
placeholder="BIGO ID"
value={bigoId}
onChange={(e)=>setBigoId(e.target.value)}
className="w-full p-3 mt-3 bg-black/40 border border-cyan-400/30 rounded-lg text-center outline-none focus:border-yellow-400"

/>
<p className="text-green-400 text-xl font-bold mt-5 mb-5 text-center">
{selectedPrice}
</p>

<button
onClick={()=>setPaymentOpen(true)}
className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
>
Siparis Ver
</button>

</div>

</div>



{/* ORDER MODAL */}

{orderOpen && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

<div className="bg-[#0b0b12] border border-cyan-500 p-8 rounded-2xl w-[400px]">

<h2 className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]">
Sipariş Oluştur
</h2>

<button
onClick={()=>{

setOrderOpen(false)
setSuccessOpen(true)
}}
className="bg-cyan-500 w-full py-2 rounded-lg text-black"
>
Siparişi Oluştur
</button>


<button
onClick={()=>setOrderOpen(false)}
className="mt-3 text-gray-400 w-full"
>
Kapat
</button>

</div>

</div>

)}



{/* PAYMENT MODAL */}

{paymentOpen && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

<div className="bg-[#0b0b12] border border-yellow-400/100 p-8 rounded-xl w-[350px] shadow-[0_0_30px_rgba(250,204,21,0.4)]">

<h2 className="text-yellow-400 text-xl mb-4 font-semibold drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]">
Ödeme Yöntemi Seç
</h2>

<button
onClick={()=>{
setPaymentOpen(false)
setPaymentStep(true)
}}
className="w-full bg-yellow-400 py-2 rounded mb-3 text-black font-semibold shadow-[0_0_20px_rgba(250,204,21,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(250,204,21,1)] transition"
>
Havale / EFT
</button>

<button
onClick={() => setPaymentOpen(false)}
className="w-full border border-yellow-400 text-yellow-400 py-2 rounded font-semibold hover:bg-yellow-400 hover:text-black transition"
>
Geri Çık
</button>

</div>

</div>

)}



{/* SUCCESS MODAL */}

{successOpen && (
<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">

<div className="
relative
bg-[#05080f]
border border-yellow-400/70
p-10
rounded-2xl
text-center
w-[340px]
shadow-[0_0_40px_rgba(255,215,0,0.5)]
animate-[scaleIn_0.4s_ease]
">

{/* GLOW HALO */}
<div className="absolute inset-0 rounded-2xl border border-yellow-400 opacity-30 blur-xl"></div>

{/* ICON */}
<div className="relative mb-6 flex justify-center">

<div className="
w-20 h-20 rounded-full
bg-yellow-400/10
flex items-center justify-center
shadow-[0_0_30px_rgba(255,215,0,0.8)]
animate-pulse
">

<span className="text-4xl text-yellow-400 drop-shadow-[0_0_10px_#FFD700]">
✓
</span>

</div>

</div>

{/* TEXT */}
<h2 className="
text-2xl font-bold text-yellow-400
drop-shadow-[0_0_12px_#FFD700]
mb-2
">
SİPARİŞ BAŞARILI
</h2>

<p className="text-gray-400 text-sm mb-6">
Elmas yüklemeniz hazırlanıyor...
</p>

{/* BUTTON */}
<button
onClick={()=>setSuccessOpen(false)}
className="mt-6 bg-yellow-400 px-6 py-2 rounded-lg text-black z-10 relative"
>
Tamam
</button>

</div>
</div>
)}




{/* BIGO MASKOT */}

<img
src="/Bigo.png"
className="fixed bottom-6 right-6 w-28 z-40 animate-[float_4s_ease-in-out_infinite]"
/>



{/* FOOTER */}

<footer className="mt-40 border-t border-cyan-500/20 py-10 text-center text-gray-500">

<p>© 2026 Horus Medya</p>

<p className="mt-2">
Bigolive Partner Agency
</p>

{paymentStep && (
<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">

<div className="bg-[#0b0b12] border border-yellow-400/80 shadow-[0_0_40px_rgba(250,204,21,0.6)] p-8 rounded-xl w-[350px]">

<div className="mx-auto mb-4 w-20 h-20 rounded-full border-2 border-yellow-400 flex items-center justify-center shadow-[0_0_25px_rgba(250,204,21,0.8)]">

<img
src="/horus2.png"
className="w-16 h-16 rounded-full"
/>

</div>


<h2 className="text-yellow-400 text-xl font-semibold mb-4 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]"
>Ödeme Ekranı</h2>

<div className="bg-black/50 border border-yellow-400/60 rounded-xl p-4 mb-4 shadow-[0_0_25px_rgba(250,204,21,0.5)] text-center">

<p className="text-sm text-gray-400">Bigo ID</p>
<p className="text-lg text-yellow-400 font-semibold mb-2 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
{bigoId || "-"}
</p>

<div className="h-[1px] bg-yellow-400/30 my-2"></div>

<p className="text-sm text-gray-400">Elmas</p>
<p className="text-lg text-yellow-400 font-semibold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
{diamondAmount.toLocaleString("tr-TR")}
</p>

</div>


<button
onClick={()=>{
setPaymentStep(false)
setIbanStep(true)
}}
className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold border border-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.9)] hover:scale-105 hover:shadow-[0_0_40px_rgba(250,204,21,1)] transition"
>
Havale ile Öde
</button>

<button
onClick={()=>setPaymentStep(false)}
className="mt-4 text-gray-400"
>
İptal
</button>

</div>
</div>
)}
{ibanStep && (
<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">

<div className="bg-[#0b0b12] border-2 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.6)] p-10 rounded-2xl text-center w-[500px]">

<img src="/horus.png" className="w-20 mx-auto mb-4 animate-pulse"/>

<h2 className="text-green-400 text-2xl mb-4">Havale Bilgileri</h2>

<p className="text-gray-300 text-sm mb-4 leading-relaxed border border-green-500/30 p-3 rounded-lg bg-black/30">
💸 Havale yaptıktan sonra lütfen <span className="text-green-400 font-semibold">“Ödemeyi Yaptım”</span> tusuna tıklayınız.
<br />
⏳ Elmas aktarımı kısa süre içerisinde gerçekleştirilecektir.
<br />
📞 Herhangi bir sorunda bayi numaramızdan bizimle iletişime geçebilirsiniz.
</p>

<div className="bg-black border border-green-500 p-4 mt-3 rounded-lg text-left space-y-4">


{/* İSİM */}
<div>
<p className="text-gray-400 text-sm mb-1">Alıcı</p>

<div className="flex justify-between items-center bg-[#111] p-2 rounded">
<span className="text-white text-sm font-semibold">
{name}
</span>

<button
onClick={()=>{
navigator.clipboard.writeText(name)
setCopied("name")
setTimeout(()=>setCopied(""),2000)
}}
className="text-xs bg-gray-700 px-2 py-1 rounded"
>
{copied==="name" ? "Kopyalandı ✅" : "Kopyala"}
</button>
</div>
</div>

{/* IBAN */}
<div>
<p className="text-gray-400 text-sm mb-1">IBAN</p>

<div className="flex justify-between items-center bg-[#111] p-3 rounded border border-green-400">
<span className="text-green-400 text-lg font-bold tracking-wider">
{iban}
</span>

<button
onClick={()=>{
navigator.clipboard.writeText(iban)
setCopied("iban")
setTimeout(()=>setCopied(""),2000)
}}
className="bg-green-600 px-3 py-1 rounded text-black text-sm"
>
{copied==="iban" ? "Kopyalandı ✅" : "Kopyala"}
</button>
</div>
</div>

</div>

<button
onClick={()=>{
createOrder(bigoId,diamondAmount)
setIbanStep(false)
setSuccessOpen(true)
}}
className="w-full bg-green-500 py-3 rounded text-black text-lg"
>
Ödemeyi Yaptım
</button>

<button
onClick={()=>setIbanStep(false)}
className="mt-3 text-gray-400"
>
İptal
</button>

</div>
</div>
)}

{bigoStep && (
<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">

<div className="
relative
w-[90%] max-w-md
p-6 rounded-2xl
border border-yellow-400/40
bg-black/90
shadow-[0_0_25px_rgba(255,215,0,0.25)]
text-center
">
{selectedPackage && (
<div className="
mb-4 p-3 rounded-lg
border border-yellow-400/50
bg-black/40
shadow-[0_0_15px_rgba(255,215,0,0.3)]
">

<p className="text-gray-400 text-sm">
Ödenecek Tutar
</p>

<p className="
text-yellow-400 text-xl font-bold
drop-shadow-[0_0_10px_#FFD700]
">
{selectedPackage.price}
</p>

</div>
)}

{/* ❌ KAPAT BUTONU */}
<button
onClick={() => setBigoStep(false)}
className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-xl"
>
✕
</button>

{/* TITLE */}
<h2 className="
text-2xl mb-6
text-yellow-400
drop-shadow-[0_0_10px_#FFD700]
font-bold
">
Bigo ID Gir
</h2>

{/* INPUT */}
<input
type="text"
value={bigoId}
onChange={(e)=>setBigoId(e.target.value)}
placeholder="Bigo ID"
className="
w-full p-3 mb-4 rounded-lg
bg-black border border-yellow-400/30
text-white outline-none
focus:border-yellow-400
focus:shadow-[0_0_10px_rgba(255,215,0,0.4)]
"
/>

{/* DEVAM */}
<button
onClick={()=>{
if(!bigoId){
alert("Bigo ID gir")
return
}
setBigoStep(false)
setPaymentOpen(true)
}}
className="
w-full py-3 rounded-lg font-bold
text-black
bg-gradient-to-r from-yellow-400 to-yellow-600
hover:from-yellow-300 hover:to-yellow-500
shadow-[0_0_15px_rgba(255,215,0,0.5)]
transition
"
>
Devam Et
</button>

{/* GERİ BUTON */}
<button
onClick={() => setBigoStep(false)}
className="mt-4 text-gray-400 hover:text-yellow-400 transition"
>
Geri Çık
</button>

</div>
</div>
)}

</footer>

<div className="fixed bottom-5 left-5 z-50">

<button
onClick={() => setWhatsappOpen(true)}
className="bg-green-500 hover:scale-110 transition p-3 rounded-full shadow-[0_0_20px_#00ff88]"
>
<img src="/whatsapp.png" className="w-6 h-6" />
</button>

{whatsappOpen && (
<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

<div className="bg-[#0b0b12] border border-green-500 p-8 rounded-2xl text-center w-[350px] shadow-[0_0_40px_#00ff88]">

<h2 className="text-green-400 text-xl mb-4">
HORUS 💎 BAYI
</h2>

<p className="text-gray-300 mb-2">
7/24 AKTİF
</p>

<p className="text-green-400 text-lg font-bold mb-4">
WHATSAPP BAYI NUMARASI
</p>

<div className="bg-black border border-green-500 p-3 rounded mb-4">
+90 543 673 04 02
</div>

<a
href="https://wa.me/05436730402?text="
target="_blank"
className="relative bg-green-500 p-3 rounded text-sm inline-block mr-3
animate-pulse hover:scale-110 transition duration-300
shadow-[0_0_15px_#00ff88] hover:shadow-[0_0_40px_#00ff88]"
>
WhatsApp'tan Yaz
</a>

<button
onClick={() => setWhatsappOpen(false)}
className="text-gray-400 mt-2"
>
Kapat
</button>

</div>

</div>
)}

</div>


</div>

)

}