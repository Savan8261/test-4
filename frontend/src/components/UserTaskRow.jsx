import { useState } from "react";
import styled from "styled-components";

import { convertDate } from "../helper/convertDate";

import TableRow from "../ui/TableRow";
import Overlay from "./Overlay";
import Button from "../ui/Button";
import ConfirmSubmit from "./ConfirmSubmit";

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

function UserTaskRow({ taskEl }) {
  const [verifyComplete, setVerifyComplete] = useState(false);

  const { id, task, description, startDate, dueDate, status } = taskEl;

  const accecibleBtn = status === "completed" || status === "overdue";

  return (
    <TableRow>
      <Task>{task}</Task>
      <Description> {description} </Description>
      <StyledDiv> {convertDate(startDate)} </StyledDiv>
      <StyledDiv> {convertDate(dueDate)} </StyledDiv>
      <StyledDiv> {status} </StyledDiv>

      <div>
        {!accecibleBtn && (
          <Button
            size="small"
            onClick={(e) => {
              e.preventDefault();
              setVerifyComplete(true);
            }}
          >
            Submit as Complete
          </Button>
        )}
        {verifyComplete && (
          <Overlay onClick={() => setVerifyComplete(false)}>
            <ConfirmSubmit
              taskEl={taskEl}
              taskId={id}
              setVerifyComplete={() => setVerifyComplete(false)}
            />
          </Overlay>
        )}
      </div>
    </TableRow>
  );
}

export default UserTaskRow;
