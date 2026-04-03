import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Horus Bigo Elmas",
  description: "Türkiye'nin en hızlı Bigolive elmas satış sitesi",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Mobil cihazlar için en temel görüntü ayarı */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      {/* Fontları sildik, sistemin kendi fontunu kullanacak (Hata ihtimali SIFIR) */}
      <body suppressHydrationWarning={true} style={{ margin: 0, padding: 0, backgroundColor: '#020617' }}>
        {children}
      </body>
    </html>
  );
}