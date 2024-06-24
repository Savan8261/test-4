import styled from "styled-components";
import Menu from "../ui/Menu";
import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableBody from "../ui/TableBody";
import UserTaskRow from "./UserTaskRow";
import { useSelector } from "react-redux";
const StyledDiv = styled.div`
  text-align: center;
`;

function UserTaskTable() {
  const tasks = useSelector((store) => store.task.tasks);

  return (
    <Menu>
      <Table>
        <TableHeader>
          <div>Task</div>
          <div>Description</div>
          <StyledDiv>Start date</StyledDiv>
          <StyledDiv>due date</StyledDiv>
          <StyledDiv>Status</StyledDiv>
          <div></div>
        </TableHeader>
        {tasks.length > 0 && (
          <TableBody>
            {tasks.map((task) => {
              return <UserTaskRow taskEl={task} key={task.id} />;
            })}
          </TableBody>
        )}
      </Table>
    </Menu>
  );
}

export default UserTaskTable;
