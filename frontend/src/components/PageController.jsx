import { useSelector } from "react-redux";
import styled from "styled-components";

const PageButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
`;

const PageBtn = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
`;

const PageDial = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  background-color: #0f3659;
  color: white;
  border-radius: 20px;
`;

const PageIndicator = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

function PageController({ page, limit, setPageNumber }) {
  const totalTasks = useSelector((store) => store.task.totalTasks);

  const total = Math.ceil(totalTasks / limit);

  const totalPages = isNaN(total) ? 1 : total === 0 ? 1 : total;

  function handleIncrement() {
    if (page >= totalPages) return;
    setPageNumber((number) => number + 1);
  }

  function handleDecrement() {
    if (page <= 1) return;
    setPageNumber((number) => number - 1);
  }

  return (
    <PageDial>
      <PageIndicator>
        page {page} of {totalPages}
      </PageIndicator>
      <PageButtonGroup>
        <PageBtn onClick={handleDecrement}>-</PageBtn>
        <PageBtn onClick={handleIncrement}>+</PageBtn>
      </PageButtonGroup>
    </PageDial>
  );
}

export default PageController;
