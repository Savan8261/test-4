import { useState } from "react";
import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";

import { convertDate } from "../helper/convertDate";

import EditTaskForm from "../features/adminFeatures/EditTaskForm";

import TableRow from "../ui/TableRow";
import Overlay from "./Overlay";
import ConfirmDelete from "./ConfirmDelete";

const Task = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const StyledDiv = styled.div`
  text-align: center;
`;
const Description = styled.div`
  max-width: 230px;
`;

function TaskRow({ taskEl }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);

  const { id, task, description, startDate, dueDate, users, status } = taskEl;

  return (
    <TableRow>
      <Task>{task}</Task>
      <Description> {description} </Description>
      <StyledDiv> {convertDate(startDate)} </StyledDiv>
      <StyledDiv> {convertDate(dueDate)} </StyledDiv>
      <StyledDiv> {users?.username} </StyledDiv>
      <StyledDiv> {status} </StyledDiv>

      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setToggleEdit(true);
          }}
        >
          <HiPencil />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setToggleDelete(true);
          }}
        >
          <HiTrash />
        </button>

        {toggleEdit && (
          <Overlay close={() => setToggleEdit(false)}>
            <EditTaskForm
              taskToEdit={taskEl}
              close={() => setToggleEdit(false)}
            />
          </Overlay>
        )}

        {toggleDelete && (
          <Overlay close={() => setToggleDelete(false)}>
            <ConfirmDelete close={() => setToggleDelete(false)} taskid={id} />
          </Overlay>
        )}
      </div>
    </TableRow>
  );
}

export default TaskRow;
