import React from "react";
import { Outlet } from "react-router-dom";

import Logout from "../components/Logout";

import Header from "../ui/Header";
import Main from "../ui/Main";
import Container from "../ui/Container";
import Workboard from "../ui/Workboard";

import AdminSidebar from "../features/adminFeatures/AdminSidebar";

const AdminPage = () => {
  return (
    <Container page="app">
      <AdminSidebar />
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
};

export default AdminPage;
