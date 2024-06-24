import styled from "styled-components";
import CardContainer from "../ui/CardContainer";

const StyledHeading = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 0;
  margin-bottom: 0;
`;
const StyledData = styled.p`
  font-size: 36px;
  font-weight: bold;
`;
function DataCard({ heading, data, color, backgroundColor }) {
  return (
    <CardContainer color={color} backgroundColor={backgroundColor}>
      <StyledHeading>{heading}</StyledHeading>
      <StyledData> {data}</StyledData>
    </CardContainer>
  );
}

export default DataCard;
