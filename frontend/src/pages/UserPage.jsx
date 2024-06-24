import { Outlet } from "react-router-dom";

import Logout from "../components/Logout";
import UserSidebar from "../features/userFeatures/UserSideBar";

import Container from "../ui/Container";
import Header from "../ui/Header";
import Main from "../ui/Main";
import Workboard from "../ui/Workboard";

function UserPage() {
  return (
    <Container page="app">
      <UserSidebar />
      <Main page="app">
        <Header page="app">
          <Logout />
        </Header>
        <Workboard>
          <Outlet />
        </Workboard>
      </Main>
    </Container>
  );
}

export default UserPage;
