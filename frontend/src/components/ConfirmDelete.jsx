import styled from "styled-components";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { deleteTask } from "../slices/taskSlice";

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

function ConfirmDelete({ close, taskid }) {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteTask(taskid));
    close();
  };

  return (
    <StyledConfirmDelete>
      <Heading>Delete </Heading>
      <p>
        Are you sure you want to delete this permanently? This action cannot be
        undone.
      </p>

      <div>
        <Button variation="secondary" onClick={() => close()}>
          Cancel
        </Button>
        <Button variation="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
