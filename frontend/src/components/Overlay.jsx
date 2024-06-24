import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import Button from "../ui/Button";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  border-radius: 25px 0 25px 25px;
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Overlay({ children, close }) {
  return (
    <StyledOverlay>
      <StyledModal>
        <Button onClick={close} variation="exit">
          <HiXMark />
        </Button>
        {children}
      </StyledModal>
    </StyledOverlay>
  );
}

export default Overlay;
