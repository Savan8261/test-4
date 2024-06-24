import { useDispatch, useSelector } from "react-redux";
import PieChart from "../../components/PieChart";
import { useEffect } from "react";
import { fetchUserTasksStatsById } from "../../slices/taskSlice";
import Dashboard from "../../ui/Dashboard";
import PieChartContainer from "../../ui/PieCHartContainer";
import CardsContainer from "../../ui/CardsContainer";
import DataCard from "../../components/DataCard";

function UserDashboard() {
  const dispatch = useDispatch();

  const { id } = useSelector((store) => store.auth.user);

  useEffect(
    function () {
      dispatch(fetchUserTasksStatsById({ id }));
    },
    [dispatch, id]
  );

  const stats = useSelector((store) => store.task.stats);

  const { totalTasks, pendingTasks, completedTasks, overduedTasks } = stats;

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
          heading="Completed"
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
      </CardsContainer>
    </Dashboard>
  );
}

export default UserDashboard;
