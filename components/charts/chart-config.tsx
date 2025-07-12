"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
)

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: "Inter, sans-serif",
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#1e293b",
      bodyColor: "#475569",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      displayColors: true,
      usePointStyle: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#64748b",
        font: {
          size: 11,
          family: "Inter, sans-serif",
        },
      },
    },
    y: {
      grid: {
        color: "#f1f5f9",
        drawBorder: false,
      },
      ticks: {
        color: "#64748b",
        font: {
          size: 11,
          family: "Inter, sans-serif",
        },
      },
    },
  },
}

export const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: "Inter, sans-serif",
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#1e293b",
      bodyColor: "#475569",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
    },
  },
}

export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: "Inter, sans-serif",
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#1e293b",
      bodyColor: "#475569",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      displayColors: true,
      usePointStyle: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#64748b",
        font: {
          size: 11,
          family: "Inter, sans-serif",
        },
      },
    },
    y: {
      grid: {
        color: "#f1f5f9",
        drawBorder: false,
      },
      ticks: {
        color: "#64748b",
        font: {
          size: 11,
          family: "Inter, sans-serif",
        },
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
    },
  },
}
