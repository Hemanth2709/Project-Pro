"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { useData } from "@/contexts/DataContext"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Resource Allocation by Project",
    },
  },
}

export function ResourceAllocationChart() {
  const { projects, resources } = useData()

  const projectResourceCounts = projects.map(project => {
    return resources.filter(resource => resource.assignedTo === project.id).length
  })

  const data = {
    labels: projects.map(p => p.title),
    datasets: [
      {
        label: "Resources Allocated",
        data: projectResourceCounts,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  return <Bar options={options} data={data} />
}