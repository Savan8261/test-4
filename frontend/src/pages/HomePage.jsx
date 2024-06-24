import styled from "styled-components";

import Logo from "../components/Logo";
import LoginSignupForm from "../features/LoginSignupForm";
import Footer from "../components/Footer";

import Container from "../ui/Container";
import Header from "../ui/Header";
import Main from "../ui/Main";

const TitleImage = styled.img`
  max-width: 600px;
`;

function HomePage() {
  return (
    <Container>
      <Header page="home">
        <Logo />
      </Header>
      <Main page="home">
        <TitleImage src="/office.jpg" alt="pic" />
        <LoginSignupForm />
      </Main>
      <Footer />
    </Container>
  );
}

export default HomePage;
