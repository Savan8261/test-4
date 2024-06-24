import PieChart from "../../components/PieChart";
import DataCard from "../../components/DataCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasksStats } from "../../slices/taskSlice";
import Dashboard from "../../ui/Dashboard";
import PieChartContainer from "../../ui/PieCHartContainer";
import CardsContainer from "../../ui/CardsContainer";

function AdminDashboard() {
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(fetchTasksStats());
    },
    [dispatch]
  );

  const stats = useSelector((store) => store.task.stats);

  const {
    totalTasks,
    pendingTasks,
    completedTasks,
    overduedTasks,
    completedToday,
  } = stats;

  return (
    <Dashboard>
      <PieChartContainer>
        <h1>Stats</h1>
        <PieChart stats={stats} />
      </PieChartContainer>
      <CardsContainer>
        <DataCard
          heading="Total"
          data={totalTasks}
          backgroundColor="rgba(6, 52, 77, 0.903)"
          color="#d9e1e7"
        />
        <DataCard
          heading="Pending"
          data={pendingTasks}
          backgroundColor="rgba(240, 229, 31, 0.95)"
          color="#8d0c0c"
        />
        <DataCard
          heading="Total Completed"
          data={completedTasks}
          backgroundColor="rgba(19, 136, 8, 0.95)"
          color="#c8d7e4"
        />
        <DataCard
          heading="Overdued"
          data={overduedTasks}
          backgroundColor="rgba(136, 140, 143, 0.95)"
          color="#8d0c0c"
        />
        <DataCard
          heading="Completed Today"
          data={completedToday}
          backgroundColor="rgba(84, 162, 43, 0.95)"
          color="#563434"
        />
      </CardsContainer>
    </Dashboard>
  );
}

export default AdminDashboard;
