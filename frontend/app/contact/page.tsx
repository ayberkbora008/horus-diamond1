"use client"

import { useState } from "react"
import Link from "next/link";

export default function Contact(){
 

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden font-sans"
    
      style={{
        backgroundColor: "#020617",
        backgroundImage: `radial-gradient(#ffffff11 1px, transparent 1px), linear-gradient(to bottom right, #020617, #030712, #000000)`,
        backgroundSize: "60px 60px, 100% 100%",
      }}>
<button
onClick={() => window.history.back()}
className="
flex items-center gap-2
px-4 py-2 rounded-xl
bg-gradient-to-r from-yellow-400/20 to-transparent
border border-yellow-400
text-yellow-400 font-bold
shadow-[0_0_20px_rgba(255,215,0,0.8)]
hover:shadow-[0_0_40px_rgba(255,215,0,1)]
transition
"
>
<span className="text-xl">←</span> Geri
</button>
      {/* YARDIM İÇERİK */}
      <main className="max-w-4xl mx-auto pt-24 pb-32 px-4 font-black uppercase">
        <h1 className="text-4xl md:text-5xl text-center text-yellow-400 drop-shadow-[0_0_15px_#facc15] mb-12 italic tracking-tighter">YÜKLEME NASIL YAPILIR?</h1>

        <div className="grid gap-6">
          <div className="bg-black/60 border-4 border-yellow-400 p-6 rounded-3xl shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            <h2 className="text-yellow-400 text-xl mb-3 italic">1. PAKETİNİZİ SEÇİN</h2>
            <p className="text-gray-300 text-sm tracking-widest leading-relaxed">Ana sayfa veya Elmas Paketleri kısmından ihtiyacınız olan elmas miktarını belirleyip "Satın Al" butonuna tıklayın.</p>
          </div>

          <div className="bg-black/60 border-4 border-yellow-400 p-6 rounded-3xl shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            <h2 className="text-yellow-400 text-xl mb-3 italic">2. BIGO ID DOĞRULAYIN</h2>
            <p className="text-gray-300 text-sm tracking-widest leading-relaxed">Yükleme yapılacak hesabın BIGO ID numarasını girerek doğruluğundan emin olun. Yanlış girilen ID'lerden ajansımız sorumlu değildir.</p>
          </div>

          <div className="bg-black/60 border-4 border-yellow-400 p-6 rounded-3xl shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            <h2 className="text-yellow-400 text-xl mb-3 italic">3. ÖDEME VE ONAY</h2>
            <p className="text-gray-300 text-sm tracking-widest leading-relaxed">Ödeme ekranında belirtilen IBAN adresine Havale/EFT yapın. "Ödemeyi Yaptım" butonuna bastıktan sonra siparişiniz admin panelimize düşer.</p>
          </div>

          <div className="bg-black/60 border-4 border-yellow-400 p-6 rounded-3xl shadow-[0_0_20px_rgba(250,204,21,0.2)]">
            <h2 className="text-yellow-400 text-xl mb-3 italic">4. ANINDA TESLİMAT</h2>
            <p className="text-gray-300 text-sm tracking-widest leading-relaxed">Admin ekibimiz dekont kontrolünü saniyeler içinde yapar ve elmaslarınız Bigo hesabınıza Horus Medya güvencesiyle otomatik aktarılır.</p>
          </div>
        </div>

        {/* İLETİŞİM BÖLÜMÜ */}
        <h2 className="text-3xl text-center text-yellow-400 mt-20 mb-10 italic">RESMİ İLETİŞİM KANALLARI</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* MAIL */}
          <div className="bg-black/80 border-2 border-yellow-400 p-6 rounded-3xl text-center shadow-[0_0_15px_#facc1533]">
            <img src="/mail.png" className="w-12 h-12 mx-auto mb-4" />
            <p className="text-[10px] text-gray-500 mb-2 tracking-widest">RESMİ E-POSTA</p>
            <p className="text-xs text-yellow-400 lowercase truncate">resmi@horusmedyailetisim.com</p>
          </div>

          {/* INSTA 1 */}
          <a href="https://www.instagram.com/horusmedya" target="_blank" className="group">
            <div className="bg-black/80 border-2 border-yellow-400 p-6 rounded-3xl text-center shadow-[0_0_15px_#facc1533] transition group-hover:shadow-[0_0_30px_#facc15]">
              <img src="/insta.png" className="w-12 h-12 mx-auto mb-4" />
              <p className="text-[10px] text-gray-500 mb-2 tracking-widest">INSTAGRAM</p>
              <p className="text-xs text-yellow-400 italic">@horusmedya</p>
            </div>
          </a>

          {/* INSTA 2 */}
          <a href="https://www.instagram.com/horusmedya.resmi/" target="_blank" className="group">
            <div className="bg-black/80 border-2 border-yellow-400 p-6 rounded-3xl text-center shadow-[0_0_15px_#facc1533] transition group-hover:shadow-[0_0_30px_#facc15]">
              <img src="/insta2.png" className="w-12 h-12 mx-auto mb-4" />
              <p className="text-[10px] text-gray-500 mb-2 tracking-widest">INSTAGRAM RESMİ</p>
              <p className="text-xs text-yellow-400 italic">@horusmedya.resmi</p>
            </div>
          </a>

        </div>
      </main>

      <footer className="mt-20 border-t border-yellow-500/10 py-10 text-center text-gray-500 font-black uppercase tracking-widest opacity-40">
        <p>© 2026 Horus Medya - Bigolive Partner Agency</p>
      </footer>
    </div>
  )
}