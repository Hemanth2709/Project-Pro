"use client"

import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

import { useData } from "@/contexts/DataContext"

ChartJS.register(ArcElement, Title, Tooltip, Legend)

export function ResourceMetricsChart() {
  const { resources } = useData()

  const resourceTypes = resources.reduce(
    (acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const data = {
    labels: Object.keys(resourceTypes),
    datasets: [
      {
        label: "Resource Count",
        data: Object.values(resourceTypes),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(53, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="relative h-[350px] w-full">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Resource Distribution by Type",
            },
          },
        }}
        plugins={[
          {
            id: "centerText",
            afterDraw: (chart) => {
              const ctx = chart.ctx
              const { top, left, width, height } = chart.chartArea
              const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0)
              ctx.fillText(`${total}`, left + width / 2, top + height / 2)
            },
          },
        ]}
      />
    </div>
  )
}
