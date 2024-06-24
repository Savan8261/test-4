import styled from "styled-components";

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  min-width: 600px;
  margin-top: 50px;
`;

export default CardsContainer;
