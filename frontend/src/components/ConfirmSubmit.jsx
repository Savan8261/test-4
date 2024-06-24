import styled from "styled-components";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { submitTaskAsComplete } from "../slices/taskSlice";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

function ConfirmSubmit({ setVerifyComplete, taskId, taskEl }) {
  const dispatch = useDispatch();

  const updatedTask = {
    task: taskEl.task,
    description: taskEl.description,
    startDate: taskEl.startDate,
    dueDate: taskEl.dueDate,
    userId: taskEl.userId,
    status: "completed",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(submitTaskAsComplete({ id: taskId, update: updatedTask }));
    setVerifyComplete();
  };

  return (
    <StyledConfirmDelete>
      <Heading>Sbmit </Heading>
      <p>Are you sure you want to submit this task as completed?</p>

      <div>
        <Button variation="danger" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmSubmit;
