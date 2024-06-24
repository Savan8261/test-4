import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ stats }) => {
  const { pendingTasks, completedTasks, overduedTasks } = stats;

  const data = {
    labels: ["pending-tasks", "completed-tasks", "overdue-tasks"],
    datasets: [
      {
        label: "tasks-status",
        data: [pendingTasks, completedTasks, overduedTasks],
        backgroundColor: [
          "rgba(240, 229, 31, 0.95)",
          "rgba(19, 136, 8, 0.95)",
          "rgba(26, 89, 138, 0.95)",
        ],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "350px", height: "500px", maxWidth: "100%" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
