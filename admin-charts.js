// Register ChartDataLabels plugin
Chart.register(ChartDataLabels);

// Helper function to create charts
function createChart(id, type, labels, data, backgroundColor, options = {}) {
  const canvas = document.getElementById(id);
  if (!canvas) {
    console.error(`Canvas with id "${id}" not found`);
    return null;
  }

  return new Chart(canvas, {
    type,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderColor: options.borderColor || undefined,
          label: options.label || "",
          fill: options.fill !== undefined ? options.fill : false,
          tension: options.tension || 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: options.padding !== undefined ? options.padding : 20,
      },
      plugins: {
        legend: {
          display: options.legend !== undefined ? options.legend : false,
        },
        tooltip: {
          enabled: options.tooltip !== undefined ? options.tooltip : true,
        },
        datalabels: {
          display:
            options.showDataLabels !== undefined
              ? options.showDataLabels
              : true,
          color: options.labelColor || "white",
          font: {
            weight: "bold",
            size: options.labelSize || 14,
          },
          formatter: options.labelFormatter || ((v) => v),
          anchor: options.anchor || "center",
          align: options.align || "center",
        },
      },
      scales: options.scales || undefined,
      cutout: options.cutout || undefined,
    },
  });
}

// Demographics Chart
createChart(
  "demographicsChart",
  "pie",
  ["Total Residents", "Male", "Female", "Seniors", "Total Voters"],
  [151, 74, 78, 52, 102],
  ["#001D39", "#0A4174", "#49769F", "#4E8EA2", "#6EA2B3"],
  {
    labelFormatter: (value, ctx) => {
      const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
      return ((value / total) * 100).toFixed(1) + " %";
    },
    labelSize: 14,
  }
);

// Document Requests Chart
createChart(
  "documentChart",
  "bar",
  ["Clearance", "Certificate", "Indigency"],
  [45, 22, 48],
  ["#001D39", "#0A4174", "#49769F"],
  {
    labelColor: "#21205d",
    labelSize: 12,
    anchor: "end",
    align: "top",
    padding: {
      top: 20,
      bottom: 5,
      left: 10,
      right: 10,
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
      },
      x: {
        ticks: {
          autoSkip: false,
          color: "#21205d",
          font: { size: 11, weight: "normal" },
          padding: 5,
        },
        grid: {
          display: false,
        },
      },
    },
  }
);

// Pending Applications Chart
createChart(
  "pendingChart",
  "doughnut",
  ["Pending", "In Progress"],
  [25, 15],
  ["#001D39", "#49769F"],
  {
    labelSize: 16,
    cutout: "60%",
  }
);

// Cancelled Requests Chart
createChart(
  "cancelledChart",
  "bar",
  ["Jan", "Feb", "Mar", "Apr"],
  [5, 3, 7, 4],
  ["#0A4174", "#0A4174", "#0A4174", "#0A4174"],
  {
    labelColor: "#21205d",
    labelSize: 12,
    anchor: "end",
    align: "top",
    padding: {
      top: 20,
      bottom: 5,
      left: 10,
      right: 10,
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
      },
      x: {
        ticks: {
          font: { size: 11 },
          color: "#21205d",
        },
        grid: { display: false },
      },
    },
  }
);

// Completed Requests Chart
createChart(
  "completedChart",
  "line",
  ["January", "February", "March", "April"],
  [30, 45, 38, 52],
  ["rgba(10, 65, 116, 0.1)"],
  {
    borderColor: "#0A4174",
    fill: true,
    tension: 0.3,
    showDataLabels: false,
    padding: {
      top: 20,
      bottom: 10,
      left: 10,
      right: 10,
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 10 } },
      },
      x: {
        ticks: { font: { size: 10 } },
      },
    },
  }
);
