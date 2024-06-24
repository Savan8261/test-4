import styled from "styled-components";
import Menu from "../ui/Menu";
import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TaskRow from "./AdminTaskRow";
import TableBody from "../ui/TableBody";
import { useSelector } from "react-redux";

const StyledDiv = styled.div`
  text-align: center;
`;

function AdminTaskTable() {
  const tasks = useSelector((store) => store.task.tasks);

  return (
    <Menu>
      <Table>
        <TableHeader>
          <div>Task</div>
          <div>Description</div>
          <StyledDiv>Start date</StyledDiv>
          <StyledDiv>due date</StyledDiv>
          <StyledDiv>Assigned to</StyledDiv>
          <StyledDiv>Status</StyledDiv>
          <div></div>
        </TableHeader>
        {tasks?.length > 0 && (
          <TableBody>
            {tasks.map((task) => {
              return <TaskRow taskEl={task} key={task.id} />;
            })}
          </TableBody>
        )}
      </Table>
    </Menu>
  );
}

export default AdminTaskTable;
