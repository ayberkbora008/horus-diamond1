"use client"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "db.json")

function readDB() {
const data = fs.readFileSync(filePath, "utf-8")
return JSON.parse(data)
}

function writeDB(data: any) {
fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// ✅ GET → son yüklenenler
export async function GET() {
const db = readDB()
return NextResponse.json(db.loads || [])
}

// ✅ POST → yeni yükleme
export async function POST(req: Request) {
const body = await req.json()
const db = readDB()

const newLoad = {
id: Date.now().toString(),
bigo_id: body.bigo_id,
amount: body.amount,
admin: body.admin || "Admin",
date: new Date().toISOString()
}

if (!db.loads) db.loads = []

db.loads.unshift(newLoad)

writeDB(db)

return NextResponse.json({ success: true })
}
