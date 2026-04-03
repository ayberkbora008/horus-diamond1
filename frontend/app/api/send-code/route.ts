import nodemailer from "nodemailer"

export async function POST(req: Request) {
try {
const { email } = await req.json()

// 🔐 SADECE BU MAİLLER ADMIN
const allowedAdmins = [
"ayberkbora008@gmail.com",
"behcetygmr00@gmail.com"
]

// ❌ ADMİN DEĞİLSE DUR
if (!allowedAdmins.includes(email)) {
return Response.json(
{ error: "Admin değilsiniz" },
{ status: 403 }
)
}

const code = Math.floor(1000 + Math.random() * 9000).toString()

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: "horusmedyaelmasbayi@gmail.com",
pass: "icfaejcpydvgdlte",
},
})

await transporter.sendMail({
from: "horusmedyaelmasbayi@gmail.com",
to: email,
subject: "Horus Admin Giriş Kodunuz",

html: `
<body style="margin:0; padding:0;">

<table width="100%" bgcolor="#020617" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="
background: radial-gradient(circle at top, #020617, #000000);
border-radius: 25px;
border: 1px solid rgba(0,255,255,0.3);
padding: 40px;
box-shadow: 0 0 40px rgba(0,255,255,0.2);
">

<tr>
<td align="center">

<!-- LOGO -->
<img src="https://horus-diamond1-hv3v.vercel.app/horus2.png" />

<!-- TITLE -->
<h1 style="
color: #ffd700;
font-size: 28px;
letter-spacing: 2px;
margin: 0;
">
HORUS ADMIN GİRİŞ
</h1>

<p style="
color: #94a3b8;
margin-top: 10px;
">
Güvenli giriş doğrulama kodunuz:
</p>

<!-- 🔥 CYBER CODE BOX -->
<div style="
margin-top: 30px;
padding: 30px;
font-size: 42px;
letter-spacing: 12px;
color: #22d3ee;
border-radius: 18px;

background: linear-gradient(145deg, rgba(0,0,0,0.8), rgba(2,6,23,0.9));
border: 1px solid rgba(0,255,255,0.4);

box-shadow:
0 0 20px rgba(0,255,255,0.3),
inset 0 0 15px rgba(0,255,255,0.15);
">
${code}
</div>

<!-- 🔥 PREMIUM WARNING BOX -->
<div style="
margin-top: 35px;
padding: 18px;
border-radius: 12px;

background: rgba(255, 215, 0, 0.05);
border: 1px solid rgba(255, 215, 0, 0.4);

color: #facc15;
font-size: 14px;
line-height: 1.6;
">
⚠ Bu kodu kimseyle paylaşmayın.<br/>
Eğer bu isteği siz yapmadıysanız bizimle iletişime geçin.
</div>

<!-- FOOTER -->
<p style="
margin-top: 25px;
font-size: 13px;
color: #94a3b8;
letter-spacing: 1px;
">
© Horus Medya Güvenlik Sistemi
</p>


</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
`,

attachments: [
{
filename: "horus2.png",
path: process.cwd() + "/public/horus2.png",
cid: "logo"
}
]
})



return Response.json({ success: true, code })
} catch (err) {
console.log(err)
return Response.json({ error: "Sunucu hatası" }, { status: 500 })
}
}