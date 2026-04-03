"use client"

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement)

export default function Chart({ orders }: any) {
const approved = orders.filter((o: any) => o.status === "approved").length
const pending = orders.filter((o: any) => o.status !== "approved").length

const data = {
labels: ["Onaylanan", "Bekleyen"],
datasets: [
{
label: "Siparişler",
data: [approved, pending],
},
],
}

return (
<div className="bg-black/40 p-4 rounded border border-cyan-400 shadow-[0_0_20px_#00ffff]">
<Bar data={data} />
</div>
)
}