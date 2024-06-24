import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 3px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  max-width: 150px;
  max-height: 150px;
  min-height: 100px;
  border-radius: 20px;
  padding: 10px;
`;

export default CardContainer;
