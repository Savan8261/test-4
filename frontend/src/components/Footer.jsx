import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #0f3659;
  color: white;
  min-width: 100%;
  min-height: 55px;
  padding: 10px 20px;
  text-align: end;
`;

const StyledFooterParagraph = styled.p`
  font-size: 15px;
`;

function Footer() {
  return (
    <StyledFooter>
      <StyledFooterParagraph>@copyright</StyledFooterParagraph>
    </StyledFooter>
  );
}

export default Footer;
