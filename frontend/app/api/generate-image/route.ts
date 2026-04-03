import { NextRequest } from "next/server"
import { createCanvas, loadImage } from "canvas"

export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url)
const code = searchParams.get("code") || "0000"

const width = 500
const height = 700

const canvas = createCanvas(width, height)
const ctx = canvas.getContext("2d")

// SENİN TASARIMIN (buraya PNG linkini koy)
const image = await loadImage("http://localhost:3000/template.png")

ctx.drawImage(image, 0, 0, width, height)

// KOD YAZMA
ctx.font = "bold 50px Arial"
ctx.fillStyle = "#00ffff"
ctx.textAlign = "center"

// BURAYI AYARLIYORUZ (y koordinatı)
ctx.fillText(code, width / 2, 420)

return new Response(new Uint8Array(canvas.toBuffer("image/png")), {
headers: {
"Content-Type": "image/png"
}
})
}
