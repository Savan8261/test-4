import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  max-width: 25px;
  max-height: 25px;
  border: none;
  border-radius: 50%;
`;

const LogoTitle = styled.p`
  font-size: 23px;
  color: white;
`;

function Logo() {
  return (
    <LogoContainer>
      <LogoImage src="/logo.jpg" alt="logo" />
      <LogoTitle>TaskNet</LogoTitle>
    </LogoContainer>
  );
}

export default Logo;
