import nodemailer from "nodemailer"

export async function POST(req: Request) {
try {
const { email } = await req.json()

// sadece admin mailler
const allowedAdmins = [
"ayberkbora008@gmail.com",
"behcetygmr00@gmail.com"
]

if (!allowedAdmins.includes(email)) {
return Response.json(
{ error: "Admin değilsiniz" },
{ status: 403 }
)
}

// 4 haneli kod
const code = Math.floor(1000 + Math.random() * 9000).toString()

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}
})

await transporter.sendMail({
from: `"Horus Admin" <${process.env.EMAIL_USER}>`,
to: email,
subject: "Horus Admin Giriş Kodunuz",
html: `
<div style="font-family:sans-serif; text-align:center; padding:40px;">
<h2>Horus Admin Giriş</h2>
<p>Kodunuz:</p>
<div style="
font-size:32px;
font-weight:bold;
background:#111;
color:#0ff;
padding:20px;
border-radius:10px;
display:inline-block;
">
${code}
</div>
<p style="margin-top:20px; color:#888;">
Bu kodu kimseyle paylaşmayın.
</p>
</div>
`
})

return Response.json({ success: true, code })

} catch (err: any) {
console.error(err)
return Response.json(
{ error: "Sunucu hatası", detail: err.message },
{ status: 500 }
)
}
}